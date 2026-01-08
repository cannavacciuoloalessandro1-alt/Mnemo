# Mnemo
Il più classico dei giochi mnemonici, Mnemo stimola la memoria, invitandoti a ricordarti le lettere e abbianarle alle gemelle. Buon divertimento!


Mnemo – Memory Game

Mnemo è un gioco di memoria realizzato in HTML, CSS e JavaScript. L’obiettivo è trovare tutte le coppie di carte prima che scadano le vite o il tempo.

Funzionalità principali

Griglia di carte con lettere, numeri e simboli.

Difficoltà selezionabile: Facile, Normale, Difficile (modifica numero di vite e tempo).

Timer con conto alla rovescia.

Vite visualizzate con cuori ❤️: ogni errore fa perdere mezza vita.

Punteggio: +10 punti per ogni coppia trovata.

Suoni quando si gira una carta e quando si fa un match (attivabili/disattivabili).

Bottone “Ricomincia” per resettare il gioco.

Come giocare

Apri index.html in un browser.

Scegli la difficoltà.

Clicca sulle carte per girarle e trovare le coppie uguali.

Il gioco termina quando trovi tutte le coppie o finiscono vite/tempo.

Come funziona il codice
1. HTML (index.html)

Contiene la struttura: titolo, controlli (difficoltà, suoni, timer), griglia delle carte e bottone di restart.

2. CSS (interno o in styles.css)

Gestisce layout, colori, animazioni di flip delle carte e stile dei cuori per le vite.

3. JavaScript

game.js (logica principale)

createCards(): seleziona simboli casuali e duplica le coppie.

shuffle(): mescola le carte per randomizzare la posizione.

handleCardClick(): gestisce il click sulle carte, flip, match/mismatch, punteggio e vite.

features.js (feature aggiuntive)

setupGame(): inizializza e resetta il gioco in base alla difficoltà scelta.

startTimer(): avvia il timer del gioco.

updateLives(): mostra i cuori in base alle vite rimanenti.

Gestione suoni tramite Web Audio API quando si gira una carta o si trova una coppia.

4. Logica di gioco

Ogni volta che clicchi una carta:

Si gira (flip) e mostra il simbolo.

Se sono girate due carte, controlla se coincidono:

Match: aumenta punteggio, cambia colore carte e suona un suono.

Mismatch: toglie mezza vita e le carte tornano coperte dopo 1 secondo.