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

// const gameStructure = {};

let teclat = document.getElementById("teclat");
let tecles = teclat.querySelectorAll("[data-key]");
let taulell = document.getElementById("taulell");
let files = taulell.querySelectorAll(".fila");

document.addEventListener("DOMContentLoaded", function() {
    initialize();
});

function initialize() {
    getRandomWordToGuess();
    eventDelegation();
}

function eventDelegation() {
    tecles.forEach(tecla => tecla.addEventListener("click", () => {
        console.log(tecla);
        let key = tecla.dataset.key;
        // check if enter
        if (key === "enter") {
            submitWord();
            console.log('enter')
        }
        // check if remove
        if (key === "borrar") {
            removeLetter();
        }
        // check if letter
        if (isValidLetter(key)) {
            console.log(key);
            putLetter(key)
        }
    }));

    // detectar teclat
    document.addEventListener("keydown", (e) => {
        let key = e.key;
        // check if enter
        if (key === "Enter") {
            // check length
            submitWord();
        }
        // heck if remove
        if (key === "Backspace") {
            removeLetter();
        }
        // check if letter
        if (isValidLetter(key)) {
            putLetter(key);
        }
    })
}

function submitWord() {
    let word = gameStatus.currentWord;
    if (word.length !== gameConfig.numberOfColumns) {
        // alert la paraula ha de tenir 5 lletres
        console.log('la paraula ha de tenir 5 lletres')
        return;
    }
    if (!isValidWord(word)) {
        // alert aquesta paraula no existeix
        console.log('aquesta paraula no existeix')
        return;
    }

    // check letters
    checkLetters();

    // acabar el joc
    if (gameStatus.currentWord === gameStatus.wordToGuess) {
        // alert has guanyat
        console.log("has guanyat");
        gameStatus.status = "won";
    } else if (gameStatus.currentRow === gameConfig.numberOfRows) {
        // alert has perdut
        console.log('has perdut')
        gameStatus.status = "lost";
    }

    if (gameStatus.status === "playing") {
        nextRow();
    }
}

function checkLetters() {
    let paraula = gameStatus.wordToGuess.split('');
    let caselles = files[gameStatus.currentRow].querySelectorAll('.casella');
    caselles.forEach((casella, i) => {
        let lletra = casella.textContent.toLowerCase();
        if (lletra === paraula[i]) {
            casella.classList.add('correct');
            paraula[i] = '';
        } else if (paraula.includes(lletra)) {
            casella.classList.add('present');
        } else {
            casella.classList.add('incorrect');
        }
    });

}

function isValidWord(word) {
    return dic.includes(word);
}

function nextRow() {
    gameStatus.currentRow++;
    gameStatus.currentColumn = 0;
    gameStatus.currentWord = ""
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

    // emptyWord = "_".repeat(gameStatus.wordToGuess.length);
    // setWordCompleted(emptyWord);
}

function isValidLetter(letter) {
    let letters = /^[a-zA-Z\ç\Ç]$/;
    return letters.test(letter);
}

// Formulari
// Comprovar nom
// Comprovar cognom
// Comprovar correu
// Comprovar telefon
// Finestres formulari

let nom, cognom, email, telefon;
document.getElementById("submit").addEventListener("click", function(){
    // Comprovar nom
    if (document.getElementById("nom").value == ""){
        Swal.fire({
            text: "Si us plau, no deixis el camp del nom en blanc",
            icon: "warning"
        });
    // Comprovar cognom
    } else if (document.getElementById("cognom").value == ""){
        Swal.fire({
            text: "Si us plau, no deixis el camp del cognom en blanc",
            icon: "warning"
        });
    // Comprovar correu
    } else if (document.getElementById("email").value == ""){ 
        Swal.fire({
            text: "Si us plau, no deixis el camp del correu en blanc",
            icon: "warning"
        });
    // Comprovar contingut correu
    } else if (!/^\S+@\S+\.\S+$/.test(document.getElementById("email").value)){ 
        Swal.fire({
            text: "La direcció de correu és incorrecte",
            icon: "warning"
        });
    // Comprovar telefon
    } else if (document.getElementById("telefon").value == ""){
        Swal.fire({
            text: "Si us plau, no deixis el camp del telèfon en blanc",
            icon: "warning"
        });
    // Comprovar contingut telefon
    } else if (document.getElementById("telefon").value.length != 9 || document.getElementById("telefon").value.isNaN){
        Swal.fire({
            text: "El format del telèfon no és correcte",
            icon: "warning"
        });
    // Si els camps són correctes
    } else {
        document.getElementById("form").style.display = "none";
    }
})

document.getElementById("informacio").addEventListener("click", function(){
    Swal.fire({
        title: "Com jugar al WordleIBC?",
        html: 
            "Endevina el <b>WORDLE</b> en 6 intents. <br><br> Has d'introduir paraules de 5 lletres <ins>que existeixin</ins> i fer clic a ENTER (⏎). <br><br> Després de cada intent, el color de les lletres canviarà per indicar l'evolució de la partida. <br><br> No es tenen en compte els accents a l'hora d'introduir paraules. <br><br> Es poden repetir lletres. <br><br> Exemples: <br><br> <img src='exemple.png' alt='Exemple wordle' style='width:300px;'>  ",
        icon: "warning",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      })
})
