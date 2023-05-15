const divElements = document.querySelectorAll(".letter");
const inputLabel = document.getElementById("input-label-id");
const tryButton = document.getElementById("enter-value-btn");
const playAgainButton = document.getElementById("play-again-btn");
const trysLeftLabel = document.getElementById("trys-left-label");
const resultLabel = document.getElementById("result-label-id");

const nTrys = 5;
let gameFinished = false;
let count = 0;
var variables = ['baran', 'pizza', 'rubin', 'almaz', 'karat', 'pasta', 'delta', 'villa', 'pongo'];
let answer;

function game() {
    let word = inputLabel.value;
    if (word.length != answer.length) {
        console.log(answer);
        alert("Entered word is incorrect! Must be lentgh = 5")
    }
    else {
        if (checkRes(word)) {
            // win
            endGame(true);
        } else if (count == 0) {
            // lose
            fillAnswer();
            endGame(false);
        } else {
            // try again
            trysLeftLabel.innerHTML = --count;
        }
    }
    inputLabel.value = '';
}

function checkRes(word) {
    word = word.toUpperCase();
    index = 0;
    let res = true;
    divElements.forEach(div => {
        div.innerHTML = word[index];
        if (word[index] == answer[index]) {
            div.style.backgroundColor = "green";
        } else if (answer.indexOf(word[index]) > -1) {
            div.style.backgroundColor = "yellow";
            res = false;
        } else {
            div.style.backgroundColor = "gray";
            res = false;
        }
        index++;
    });
    return res;
}

function newGame() {
    answer = variables[Math.floor(Math.random() * variables.length)];
    gameFinished = false;
    count = nTrys;
    trysLeftLabel.innerHTML = nTrys;
    tryButton.disabled = false;
    inputLabel.disabled = false;
    answer = answer.toUpperCase();
    divElements.forEach(div => {
        div.innerHTML = "";
        resultLabel.innerHTML = "";
        div.style.backgroundColor = "white";
    });
}

function endGame(isWin) {
    resultLabel.innerHTML = isWin ? "You win!" : "You lose!";
    tryButton.disabled = true;
    inputLabel.disabled = true;
}

function fillAnswer() {
    let index = 0;
    divElements.forEach(div => {
        div.innerHTML = answer[index++];
        div.style.backgroundColor = "red";
    });
}

tryButton.addEventListener("click", game);
playAgainButton.addEventListener("click", newGame);

newGame();