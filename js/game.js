const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:",.<>?/~`';
let symbols = [];
let flippedCards = [];
let matchedCards = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createCards(pairs) {
  symbols = [];
  const randomSymbols = [];
  while (randomSymbols.length < pairs) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (!randomSymbols.includes(randomLetter)) randomSymbols.push(randomLetter);
  }
  symbols = [...randomSymbols, ...randomSymbols];
  shuffle(symbols);
}

function handleCardClick(event) {
  const clickedCard = event.target;
  if (flippedCards.length === 2 || clickedCard.classList.contains('flipped') || clickedCard.classList.contains('matched')) return;

  clickedCard.classList.add('flipped');
  clickedCard.innerText = clickedCard.dataset.symbol;
  flippedCards.push(clickedCard);

  // Suono click
  if (document.getElementById('soundToggle').checked) {
    const audioCtx = new AudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = 500;
    gain.gain.value = 0.1;
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(audioCtx.currentTime + 0.12);
  }

  if (flippedCards.length === 2) {
    const [c1, c2] = flippedCards;
    if (c1.dataset.symbol === c2.dataset.symbol) {
      c1.classList.add('matched');
      c2.classList.add('matched');
      matchedCards++;

      // Suono match
      if (document.getElementById('soundToggle').checked) {
        const audioCtx = new AudioContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.value = 800;
        gain.gain.value = 0.15;
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(); osc.stop(audioCtx.currentTime + 0.15);
      }

      score += 10;
      document.getElementById('scoreboard').innerText = `Punteggio: ${score}`;
      if (matchedCards === symbols.length / 2) {
        setTimeout(() => {
          document.getElementById('message').innerText = "Hai vinto!";
          document.getElementById('restartBtn').style.display = 'inline-block';
        }, 500);
      }
    } else {
      lives -= 0.5;
      updateLives();
      if (lives <= 0) {
        setTimeout(() => {
          document.getElementById('message').innerText = "Game Over!";
          document.getElementById('restartBtn').style.display = 'inline-block';
        }, 500);
      }
      setTimeout(() => {
        c1.classList.remove('flipped'); c1.innerText = '';
        c2.classList.remove('flipped'); c2.innerText = '';
      }, 1000);
    }
    flippedCards = [];
  }
}
