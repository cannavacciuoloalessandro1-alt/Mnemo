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

1. HTML (mnemo.html) - È la struttura del sito

Definisce dove stanno gli elementi:
    Header: titolo, selezione difficoltà, pulsanti, toggle suoni
    Main: HUD (punteggio, mosse, vite, timer), area di gioco, sidebar con power-up e classifica
    Modal: popup per vittoria o game over
    Footer: informazioni
Include i file CSS e JS che servono a dare stile e logica al gioco.

2. CSS (styles.css) - Gestisce l’aspetto visivo del gioco.

Definisce:
    Colori, sfondi, gradient, font
    Layout responsive con grid (per le carte e sidebar)
    Stile delle carte:
        .card → dimensioni, colore, effetto flip
        .card.flipped → carta girata
        .card.matched → carta abbinata (verde, non cliccabile)
    Stile HUD, lives, modal e sidebar
Permette animazioni fluide (transizioni, rotazioni 3D)

3. JavaScript – Utilità (utils.js)

Funzioni di supporto generiche:
    shuffle → mescola le carte
    sleep → pausa temporizzata per animazioni
    formatTime → converte secondi in MM:SS
    createPairs → genera coppie di simboli casuali
    save e load → gestione dati con localStorage (classifica)

4. JavaScript – Interfaccia (ui.js)

Si occupa di manipolare il DOM:
    Mostrare le carte
    Aggiornare punteggio, mosse, vite e timer
    Mostrare messaggi temporanei
    Gestire popup e classifica
    Fondamentalmente dice al browser come cambiare ciò che l’utente vede in base allo stato del gioco.

5. JavaScript – Logica di gioco (game.js)

È il cuore del gioco, contiene le regole e il funzionamento:

Stato del gioco: carte girate, punteggio, mosse, vite, timer

Funzioni principali:

flip() → girare una carta

checkMatch() → verificare se due carte matchano

reset() → inizializzare il gioco

Power-up: hint, powerReveal, powerFreeze

Gestione vittoria e game over

Timer e suoni opzionali

Event listener per pulsanti e interazione con carte