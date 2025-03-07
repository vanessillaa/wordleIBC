const gameConfig = {
    numberOfRows: 5,
    numberOfColumns: 5,
};

const gameStatus = {
    status: "playing",
    currentWord: "",
    currentRow: 0,
    currentColumn: 0,
    time: 0,
    wordToGuess: "",
};

let gameStats = {
    gamesPlayed: localStorage.getItem("gamesPlayed") ?? 0,
    wins: localStorage.getItem("wins") ?? 0,
    bestGame: localStorage.getItem("bestGame") ?? 0,
    fastestGame: localStorage.getItem("fastestGame") ?? 0,
}

let events = {
    letters: document.getElementById("letters"),
    // teclat: document.getElementById("teclat"),
    info: document.getElementById("informacio"),
    stats: document.getElementById("estadistica"),
    restart: document.getElementById("reiniciar"),
    formSubmit: document.getElementById("submit"),
}

let eventHandlers = {
    teclesClick: (e) => handleVirtualKeyboard(e.target),
    keydown: (e) => handleInputLetters(e),
    restartClick: restart,
    infoClick: info,
    statsClick: stats,
    formSubmitClick: validateForm,
}

// const gameStructure = {};

let teclat = document.getElementById("teclat");
let tecles = teclat.querySelectorAll("[data-key]");
let taulell = document.getElementById("taulell");
let files = taulell.querySelectorAll(".fila");
let form = document.getElementById("form");
// document.getElementById("form").style.display = "none"; // TODO treure

document.addEventListener("DOMContentLoaded", function() {
    initialize();
});



function initialize() {
    getGameStats();
    if (gameStats.nom == "" || gameStats.cognom == "") {
        // formulari
        form.classList.remove('hidden');
        events.formSubmit.addEventListener("click", eventHandlers.formSubmitClick);
    } else {
        startGame();
    }
}

function startGame() {
    getRandomWordToGuess();
    eventDelegation();
}

function eventDelegation() {
    // teclat virtual
    tecles.forEach(tecla => tecla.addEventListener("click", eventHandlers.teclesClick));
    // detectar teclat
    document.addEventListener("keydown", eventHandlers.keydown);
    // botons
    events.restart.addEventListener("click", eventHandlers.restartClick);
    events.stats.addEventListener("click", eventHandlers.statsClick);
    events.info.addEventListener("click", eventHandlers.infoClick);
}

function handleVirtualKeyboard(tecla) {
    let key = tecla.dataset.key;
    // submit word
    if (key === "enter") {
        submitWord();
        console.log('enter')
    }
    // remove letter
    if (key === "borrar") {
        removeLetter();
    }
    // check if letter
    if (isValidLetter(key)) {
        console.log(key);
        putLetter(key)
    }
}

function handleInputLetters(e) {
    let key = e.key;
    // Submit word
    if (key === "Enter") {
        submitWord();
    }
    // Remove letter
    if (key === "Backspace") {
        removeLetter();
    }

    // Put letter if is valid
    if (isValidLetter(key)) {
        putLetter(key);
    }
}

function removeEventListeners() {
    document.removeEventListener("keydown", eventHandlers.keydown);
    tecles.forEach(tecla => tecla.removeEventListener("click", eventHandlers.teclesClick));
}

function submitWord() {
    let word = gameStatus.currentWord;
    if (word.length !== gameConfig.numberOfColumns) {
        // alert la paraula ha de tenir 5 lletres
        setTimeout(() => {
            Swal.fire({
                text: "La paraula ha de tenir 5 lletres",
                icon: "warning",
                heightAuto: false
            });
        }, 200);

        return;
    }
    if (!isValidWord(word)) {
        setTimeout(() => {
            Swal.fire({
                text: "La paraula no existeix al diccionari",
                icon: "warning",
                heightAuto: false
            });
        }, 200);
        return;
    }

    // check letters
    checkLetters();

    // acabar el joc
    if (gameStatus.currentWord === gameStatus.wordToGuess) {
        setTimeout(() => {
            Swal.fire({
                title: "Enhorabona has guanyat!",
                text: "Ho has aconseguit amb " + (gameStatus.currentRow + 1) + " intents i amb " + gameStatus.time  + " segons.",
                icon: "success",
                heightAuto: false
            });
        }, 200);

        gameStatus.status = "won";
        localStorage.setItem("wins", gameStats.wins++);
    } else if (gameStatus.currentRow === gameConfig.numberOfRows) {
        setTimeout(() => {
            Swal.fire({
                title: "Llàstima has perdut :(",
                text: "La pròxima ho aconsegueixes",
                icon: "error",
                heightAuto: false
            });
        }, 200);

        gameStatus.status = "lost";
    }


    if (gameStatus.status !== "playing") {
        removeEventListeners();
        saveGameStats();
    } else {
        nextRow();
    }
}

function checkLetters() {
    let caselles = files[gameStatus.currentRow].querySelectorAll('.casella');
    caselles.forEach((casella, i) => {
        let lletra = casella.textContent.toLowerCase();
        casella.classList.add(getLetterColor(lletra, i));
    });

}

function getLetterColor(letter, index) {
    let isCorrectLetter = gameStatus.wordToGuess.includes(letter);
    if (!isCorrectLetter) {
        return 'incorrect';
    }

    let isCorrectPosition = letter === gameStatus.wordToGuess[index];
    if (isCorrectPosition) {
        return 'correct';
    }

    return 'present';
}

function isValidWord(word) {
    return dic.includes(word);
}

function nextRow() {
    gameStatus.currentRow++;
    gameStatus.currentColumn = 0;
    gameStatus.currentWord = "";
}

function putLetter(letter) {
    // if is not full
    if (gameStatus.currentColumn < gameConfig.numberOfColumns) {
        // add letter
        gameStatus.currentWord += letter;
        files[gameStatus.currentRow].children[gameStatus.currentColumn].textContent = letter.toUpperCase();
        gameStatus.currentColumn++;
    }
}

function removeLetter() {
    // if is not empty
    if (gameStatus.currentColumn > 0) {
        // remove letter
        gameStatus.currentColumn--;
        gameStatus.currentWord = gameStatus.currentWord.slice(0, -1);
        files[gameStatus.currentRow].children[gameStatus.currentColumn].textContent = '';
    }
}

function getRandomWordToGuess() {
    gameStatus.wordToGuess = dic[Math.floor(Math.random()*dic.length)];
    console.log(gameStatus.wordToGuess);
}

function isValidLetter(letter) {
    let letters = /^[a-zA-Z\ç\Ç]$/;
    return letters.test(letter);
}

// Formulari
function validateForm(){
    let nom = document.getElementById("nom").value;
    let cognom = document.getElementById("cognom").value;
    let email = document.getElementById("email").value;
    let telefon = document.getElementById("telefon").value;

    // Comprovar nom
    if (nom == ""){
        Swal.fire({
            text: "Si us plau, no deixis el camp del nom en blanc",
            icon: "warning",
            heightAuto: false
        });
    // Comprovar cognom
    } else if (cognom == ""){
        Swal.fire({
            text: "Si us plau, no deixis el camp del cognom en blanc",
            icon: "warning",
            heightAuto: false
        });
    // Comprovar correu
    } else if (email == ""){
        Swal.fire({
            text: "Si us plau, no deixis el camp del correu en blanc",
            icon: "warning",
            heightAuto: false
        });
    // Comprovar contingut correu
    } else if (!/^\S+@\S+\.\S+$/.test(email)){
        Swal.fire({
            text: "La direcció de correu és incorrecte",
            icon: "warning",
            heightAuto: false
        });
    // Comprovar telefon
    } else if (telefon == ""){
        Swal.fire({
            text: "Si us plau, no deixis el camp del telèfon en blanc",
            icon: "warning",
            heightAuto: false
        });
    // Comprovar contingut telefon
    } else if (telefon.length != 9 || telefon.isNaN){
        Swal.fire({
            text: "El format del telèfon no és correcte",
            icon: "warning",
            heightAuto: false
        });
    // Si els camps són correctes
    } else {
        // Guardar dades en localStorage
        localStorage.setItem("nom", nom);
        localStorage.setItem("cognom", cognom);
        localStorage.setItem("email", email);
        localStorage.setItem("telefon", telefon);

        // Ocultar formulari
        document.getElementById("form").classList.add('hidden');
        startGame();
    }
}

// Finestra info
function info (){
    Swal.fire({
        title: "Com jugar al WordleIBC?",
        html: 
            "Endevina el <b>WORDLE</b> en 6 intents. <br><br> Has d'introduir paraules de 5 lletres <ins>que existeixin</ins> i fer clic a ENTER (⏎). <br><br>" + 
            "Després de cada intent, el color de les lletres canviarà per indicar l'evolució de la partida. <br><br>" + 
            "No es tenen en compte els accents a l'hora d'introduir paraules. <br><br>" + 
            "Es poden repetir lletres. <br><br> Exemples: <br><br>" + 
            "<img src='exemple.png' alt='Exemple wordle' style='width:300px;'>  ",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
        heightAuto: false
    });
}


function getGameStats() {
    gameStats = {
        ...setUserInfo(),
        gamesPlayed: localStorage.getItem("gamesPlayed") ?? 0,
        wins: localStorage.getItem("wins") ?? 0,
        bestGame: localStorage.getItem("bestGame") ?? 0,
        fastestGame: localStorage.getItem("fastestGame") ?? 0,
    }
}

function setUserInfo() {
    return {
        nom: localStorage.getItem("nom") ?? "",
        cognom: localStorage.getItem("cognom") ?? "",
    }
}

function saveGameStats() {
    gameStatus.time = (performance.now() / 1000).toFixed(2);
    localStorage.setItem("gamesPlayed", gameStats.gamesPlayed + 1);
    localStorage.setItem("bestGame", gameStats.bestGame > gameStatus.currentRow + 1 ? gameStatus.currentRow + 1 : gameStats.bestGame);
    localStorage.setItem("fastestGame", gameStats.fastestGame > gameStatus.time ? gameStatus.time : gameStats.fastestGame);

    getGameStats();
}

// Finestra estadístiques
function stats(){
    let bestGame = gameStats.bestGame + " intents";
    let fastestGame = gameStats.fastestGame + " segons";
    if (!gameStats.gamesPlayed) {
        bestGame = "Cap partida jugada";
        fastestGame = "Cap partida jugada";
    }

    Swal.fire({
        html:
            "<img src='estadistica.png' style='width:100px'><br><br>" +
            "<h1>Estadístiques</h1><br><br>" +
            "Nom del jugador: " + gameStats.nom + " " + gameStats.cognom + "<br></br>" +
            "Partides realitzades: " + gameStats.gamesPlayed + "<br></br>" +
            "Partides guanyades: " + gameStats.wins + "<br></br>" +
            "Millor partida: " + bestGame +  "<br></br>" +
            "Partida més ràpida: " + fastestGame,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
        heightAuto: false
    });
}

// Reiniciar
function restart(){
    location.reload();
}