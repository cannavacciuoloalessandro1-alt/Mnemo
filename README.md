# Mnemo
Il più classico dei giochi mnemonici, Mnemo stimola la memoria, invitandoti a ricordarti le lettere e abbianarle alle gemelle. Buon divertimento!


Mnemo – Memory Evolution

Versione: estesa • Progetto didattico
Autore: Alessandro (o chi lo implementa)
Tecnologie: HTML5, CSS3, JavaScript (vanilla)

Descrizione

Mnemo è un gioco di memoria (Memory) evoluto, con caratteristiche aggiuntive:

Diverse difficoltà (easy, medium, hard)

Punteggio, vite e timer

Power-up: Reveal e Freeze

Classifica locale salvata nel localStorage

Effetti sonori opzionali

Interfaccia responsive e stile moderno con transizioni fluide

L’obiettivo del gioco è abbinare tutte le coppie di carte nel minor numero di mosse possibile prima che scadano le vite o il tempo.

Struttura dei file
1. mnemo.html

Contiene il markup del gioco

Include:

Header con titolo, controlli e toggle suoni

Main con HUD, area di gioco (#gameBoard) e sidebar con power-up e classifica

Modal per messaggi di vittoria o game over

Footer

Collega i file JS e CSS:

<link rel="stylesheet" href="styles.css" />
<script src="js/utils.js"></script>
<script src="js/ui.js"></script>
<script src="js/game.js"></script>

2. styles.css

Variabili CSS (:root) per colori, background e temi

Stile generale della pagina: font, gradient, layout grid

Stile carte:

.card → dimensioni, colore, bordi, shadow, transizione, transform-style: preserve-3d

.card .front e .card .back → gestione dei due lati della carta

.card.flipped → trasforma la carta in 180° quando viene girata

.card.matched → carte abbinate rimangono girate, cambiano colore in verde (--success) e diventano non cliccabili

Responsività per schermi piccoli

Stile HUD, lives, modal e sidebar

3. utils.js

Funzioni di utilità generali:

shuffle(array) → mescola array

sleep(ms) → pausa asincrona

formatTime(seconds) → formato MM:SS

createPairs(count) → genera coppie di simboli casuali per il gioco

save(key, value) e load(key, fallback) → wrapper su localStorage

4. ui.js

Gestisce tutte le manipolazioni DOM:

renderBoard(symbols, cols) → genera le carte nel DOM

updateScore(score), updateMoves(moves), updateTimer(sec), updateLives(livesCount) → aggiorna HUD

showMessage(text, timeout) → messaggi temporanei

showModal(title, text) / closeModal() → modal di fine gioco

updateLeaderboard(list) → aggiorna classifica locale

Espone l’oggetto UI con tutte le funzioni per essere usato in game.js

5. game.js

Gestione logica del gioco

Variabili di stato:

symbols, flipped, matched

score, moves, lives, timer

hintUses, difficulty, freezeTime

Parametri di difficoltà (DIFF) → definiscono righe, colonne, vite e tempo

Funzioni principali:

reset() → inizializza il gioco

attachCardEvents() → associa click e tastiera alle carte

flip(card) → gira la carta, gestisce logica flip

checkMatch() → controlla match/mismatch, aggiorna score, vite e stato carte

Power-up:

hint() → mostra temporaneamente una coppia non abbinata

powerReveal() → gira tutte le carte non abbinate per 1.2s

powerFreeze() → ferma il timer per 5s

win() / gameOver(text) → gestione fine partita

saveScore() / loadLeaderboard() → gestione classifica locale

Event listener per pulsanti Start, Restart, Hint, Reveal e Freeze

L’intero gioco è un modulo IIFE, esponendo solo Game.reset() per l’avvio

Funzionamento

Scegli la difficoltà dal menu

Premi Start

Clicca su due carte per girarle

Se le carte matchano:

Rimangono girate

Cambiano colore in verde (--success)

Diventano non cliccabili

Se non matchano:

Dopo un breve delay, le carte si girano di nuovo

Si perde una vita

Puoi usare power-up (costo in punti)

Vince chi abbina tutte le carte prima che finiscano vite o tempo

Classifica aggiornata localmente in localStorage
