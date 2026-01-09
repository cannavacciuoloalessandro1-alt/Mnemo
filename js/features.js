let score = 0;
let lives = 5;
let timer = 120;
let timerInterval = null;

function updateLives() {
  const livesContainer = document.getElementById('lives');
  livesContainer.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement('span');
    heart.classList.add('heart');
    heart.innerText = i < lives ? '❤️' : '💔';
    livesContainer.appendChild(heart);
  }
}

function formatTime(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timer > 0) {
      timer--;
      document.getElementById('timer').innerText = formatTime(timer);
    } else {
      clearInterval(timerInterval);
      document.getElementById('message').innerText = "Tempo scaduto!";
      document.getElementById('restartBtn').style.display = 'inline-block';
    }
  }, 1000);
}

function setupGame() {
  const diff = document.getElementById('difficulty').value;
  const config = DIFF[diff];

  createCards(config.pairs);
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  matchedCards = 0;
  score = 0;
  lives = config.lives;
  timer = config.time;

  document.getElementById('scoreboard').innerText = `Punteggio: ${score}`;
  document.getElementById('message').innerText = '';
  document.getElementById('timer').innerText = formatTime(timer);
  document.getElementById('restartBtn').style.display = 'none';
  updateLives();

  symbols.forEach((symbol, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.innerText = '';
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  });

  startTimer();
}

document.getElementById('restartBtn').addEventListener('click', setupGame);

setupGame();
