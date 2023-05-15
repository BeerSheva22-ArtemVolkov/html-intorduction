// configuration
const nMoves = 3;

// elements
const inputElement = document.getElementById("input-id");
const goButtonElement = document.getElementById("goButton-id");
const squareElement = document.getElementById("square-id");
const resultMessageElement = document.getElementById("gameResult-id");
const playAgainButtonElement = document.getElementById("playAgainButton-id");

// global variables
let count = 0;

// functions
function game() {
    const color = inputElement.value;
    if (color == squareElement.style.backgroundColor) {
        alert("This color already set");
    }
    else {
        squareElement.style.backgroundColor = color;
        count++;
        if (count == nMoves) {
            finishGame();
        }
    }
    inputElement.value = "";
}

function startGame() {
    count = 0;
    inputElement.readOnly = false;
    inputElement.disabled = false;
    squareElement.style.backgroundColor = "white";
    resultMessageElement.innerHTML = "";
    playAgainButtonElement.hidden = true;
}

function finishGame() {
    inputElement.disabled = true;
    inputElement.readOnly = true;
    playAgainButtonElement.hidden = false;
    resultMessageElement.innerHTML = "Game over";
}

// actions
goButtonElement.addEventListener("click", game);
playAgainButtonElement.addEventListener("click", startGame);
startGame();