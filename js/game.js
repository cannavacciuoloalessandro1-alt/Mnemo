/* game.js – core del gioco */
const Game = (function () {
    /* -------------------------
       VARIABILI DI STATO
    ---------------------------*/
    let symbols = [];
    let flipped = [];
    let matched = 0;

    let score = 0;
    let moves = 0;
    let lives = 5;

    let timer = 0;
    let timerInterval = null;
    let freezeTime = false;

    let hintUses = 2;
    let difficulty = "medium";

    let cols = 4;
    let rows = 5;

    /* -------------------------
       PARAMETRI DIFFICOLTÀ
    ---------------------------*/
    const DIFF = {
        easy: { rows: 4, cols: 4, lives: 6, time: 180 },     // 3 min
        medium: { rows: 4, cols: 5, lives: 5, time: 150 },   // 2:30
        hard: { rows: 6, cols: 6, lives: 5, time: 120 }      // 2:00
    };

    /* -------------------------
        SUONI (WebAudio)
    ---------------------------*/
    let audioCtx = null;

    function beep(freq = 440, duration = 120) {
        if (!document.getElementById("soundToggle").checked) return;
        if (!audioCtx) audioCtx = new AudioContext();

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.frequency.value = freq;
        gain.gain.value = 0.1;

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration / 1000);
    }

    /* -------------------------
        TIMER
    ---------------------------*/
    function startTimer() {
        stopTimer();
        timerInterval = setInterval(() => {
            if (!freezeTime) timer--;
            UI.updateTimer(timer);

            if (timer <= 0) {
                gameOver("Tempo scaduto!");
            }
        }, 1000);
    }

    function stopTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timerInterval = null;
    }

    /* -------------------------
        RESET GIOCO
    ---------------------------*/
    function reset() {
        matched = 0;
        moves = 0;
        score = 0;
        flipped = [];
        UI.updateScore(score);
        UI.updateMoves(moves);
        UI.showMessage("");

        difficulty = document.getElementById("difficulty").value;

        rows = DIFF[difficulty].rows;
        cols = DIFF[difficulty].cols;
        lives = DIFF[difficulty].lives;
        timer = DIFF[difficulty].time;

        UI.updateLives(lives);
        UI.updateTimer(timer);
        hintUses = 2;

        // Genera coppie
        const cardCount = rows * cols;
        symbols = Utils.createPairs(cardCount / 2);

        UI.renderBoard(symbols, cols);

        stopTimer();
        startTimer();
        attachCardEvents();
    }

    /* -------------------------
        GESTIONE CLICK CARTE
    ---------------------------*/
    function attachCardEvents() {
        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            card.addEventListener("click", () => flip(card));
            card.addEventListener("keypress", (e) => {
                if (e.key === "Enter") flip(card);
            });
        });
    }

async function flip(card) { if (freezeTime) return; if (card.classList.contains("flipped") || card.classList.contains("matched")) return; if (flipped.length >= 2) return; beep(500); card.classList.add("flipped"); flipped.push(card); if (flipped.length === 2) { moves++; UI.updateMoves(moves); await checkMatch(); } }

    /* -------------------------
        MATCH / MISMATCH
    ---------------------------*/
    async function checkMatch() {
        const [c1, c2] = flipped;

        if (c1.dataset.symbol === c2.dataset.symbol) {
            // match
            beep(800);
            c1.classList.add("matched");
            c2.classList.add("matched");

            matched++;
            score += 10;
            UI.updateScore(score);

            flipped = [];

            if (matched === symbols.length / 2) win();
        } else {
            // mismatch
            beep(250);
            lives--;
            UI.updateLives(lives);

            if (lives <= 0) {
                await Utils.sleep(600);
                return gameOver("Hai finito le vite!");
            }

            // flip-back animato
            await Utils.sleep(800);
            if (!c1.classList.contains("matched")) c1.classList.remove("flipped");
            if (!c2.classList.contains("matched")) c2.classList.remove("flipped");

            flipped = [];
        }
    }

    /* -------------------------
        HINT / POWER UPS
    ---------------------------*/
    async function hint() {
        if (hintUses <= 0) return UI.showMessage("Niente hint rimasti!");
        hintUses--;

        freezeTime = true;

        // trova una coppia non trovata
        const unmatched = [];
        document.querySelectorAll(".card").forEach(card => {
            if (!card.classList.contains("matched")) unmatched.push(card);
        });

        if (unmatched.length < 2) return;

        const targetSymbol = unmatched[0].dataset.symbol;
        let pair = unmatched.find(c => c !== unmatched[0] && c.dataset.symbol === targetSymbol);

        if (!pair) return;

        unmatched[0].classList.add("flipped");
        pair.classList.add("flipped");
        beep(700);

        await Utils.sleep(1000);

        unmatched[0].classList.remove("flipped");
        pair.classList.remove("flipped");

        freezeTime = false;
    }

    async function powerReveal() {
        if (score < 15) return UI.showMessage("Ti servono 15 punti!");

        score -= 15;
        UI.updateScore(score);

        freezeTime = true;

        document.querySelectorAll(".card").forEach(c => c.classList.add("flipped"));
        beep(900);

        await Utils.sleep(1200);

        document.querySelectorAll(".card").forEach(c => {
            if (!c.classList.contains("matched")) c.classList.remove("flipped");
        });

        freezeTime = false;
    }

    async function powerFreeze() {
        if (score < 20) return UI.showMessage("Ti servono 20 punti!");

        score -= 20;
        UI.updateScore(score);

        freezeTime = true;
        beep(300);

        UI.showMessage("Freeze: il tempo è fermo per 5 sec!", 2000);

        await Utils.sleep(5000);
        freezeTime = false;
    }

    /* -------------------------
        VITTORIA / GAME OVER
    ---------------------------*/
    function win() {
        stopTimer();
        saveScore();

        UI.showModal("Hai vinto!", `Punteggio: ${score} • Moves: ${moves}`);
    }

    function gameOver(text) {
        stopTimer();
        saveScore();

        UI.showModal("Game Over", text);
    }

    /* -------------------------
        CLASSIFICA LOCALE
    ---------------------------*/
    function saveScore() {
        const list = Utils.load("mnemo_scores", []);
        list.push({
            name: "Player",
            score,
            date: new Date().toLocaleDateString()
        });
        list.sort((a, b) => b.score - a.score);
        Utils.save("mnemo_scores", list.slice(0, 10));
        UI.updateLeaderboard(list.slice(0, 10));
    }

    function loadLeaderboard() {
        const list = Utils.load("mnemo_scores", []);
        UI.updateLeaderboard(list);
    }

    /* -------------------------
        EVENTI BOTTONI
    ---------------------------*/
    document.getElementById("startBtn").addEventListener("click", reset);
    document.getElementById("restartBtn").addEventListener("click", reset);

    document.getElementById("hintBtn").addEventListener("click", hint);
    document.getElementById("revealBtn").addEventListener("click", powerReveal);
    document.getElementById("freezeBtn").addEventListener("click", powerFreeze);

    /* -------------------------
        AVVIO
    ---------------------------*/
    loadLeaderboard();

    return { reset };
})();