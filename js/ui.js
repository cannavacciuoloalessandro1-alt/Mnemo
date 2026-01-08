/* ui.js - funzioni che manipolano il DOM */
const UI = (function(){
const dom = {
board: document.getElementById('gameBoard'),
scoreboard: document.getElementById('scoreboard'),
message: document.getElementById('message'),
timer: document.getElementById('timer'),
moves: document.getElementById('moves'),
lives: document.getElementById('lives'),
leaderboard: document.getElementById('leaderboard'),
modal: document.getElementById('modal'),
modalTitle: document.getElementById('modalTitle'),
modalText: document.getElementById('modalText'),
modalClose: document.getElementById('modalClose')
};


function renderBoard(symbols, cols){
dom.board.innerHTML = '';
dom.board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
symbols.forEach((symbol, idx) => {
const card = document.createElement('div');
card.className = 'card';
card.dataset.symbol = symbol;
card.dataset.index = idx;
card.setAttribute('tabindex', '0');
card.setAttribute('role','button');
card.innerHTML = `\n <div class="face back" aria-hidden="true"></div>\n <div class="face front" aria-hidden="true">${symbol}</div>\n `;
dom.board.appendChild(card);
});
}


function updateScore(score){ dom.scoreboard.innerText = `Punteggio: ${score}`; }
function updateMoves(m){ dom.moves.innerText = m; }
function updateTimer(sec){ dom.timer.innerText = Utils.formatTime(sec); }


function updateLives(livesCount){
dom.lives.innerHTML = '';
for(let i=0;i<5;i++){
const s=document.createElement('span');
s.className='heart';
s.innerText = i<livesCount? '❤️' : '💔';
dom.lives.appendChild(s);
}
}


function showMessage(text, timeout=3000){
dom.message.innerText = text;
if(timeout>0){
setTimeout(()=>{ if(dom.message.innerText===text) dom.message.innerText = ''; }, timeout);
}
}


function showModal(title,text){
dom.modalTitle.innerText=title; dom.modalText.innerText=text; dom.modal.classList.remove('hidden');
}
function closeModal(){ dom.modal.classList.add('hidden'); }


function updateLeaderboard(list){
dom.leaderboard.innerHTML='';
list.forEach(item=>{
const li = document.createElement('li');
li.innerText = `${item.name} — ${item.score}pts (${item.date})`;
dom.leaderboard.appendChild(li);
});
}


// Esporta
return {renderBoard, updateScore, updateMoves, updateTimer, updateLives, showMessage, showModal, closeModal, updateLeaderboard, dom};
})();


// Event listener modal close
UI.dom.modalClose.addEventListener('click', ()=>UI.closeModal());