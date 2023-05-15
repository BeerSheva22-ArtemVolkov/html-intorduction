const word_ul = document.getElementById("word-ul");
const keyboard_section = document.getElementById("keyboard-section");
const test_label = document.getElementById("test-label");
const answer_input = document.getElementById("answer-input");
const answer_btn = document.getElementById("answer-btn");
const result_label = document.getElementById("result-label");
const playAgainButton = document.getElementById("play-again-btn");
const questinDiv = document.getElementById("question-div");

let keys_divs;
let answer;
let answered;
let qa = [  ["Who is the best pirate I've ever seen?", "Who is the winner of Champions league 2012?", "What of the first name of batman?", "What country is Hugh Jackman from?", "Who lives in a pineapple under the sea?"],
            ["sparrow", "chelsea", "bruce", "Australia", "SpongeBob"]];

function gameStart() {
    refreshGame();
    setNewAnswerQuestion();
    [...answer].forEach(letter => {
        let li = document.createElement('li');
        li.className = "letter-answer";
        word_ul.appendChild(li);
        li.innerHTML = letter.toUpperCase();
    });
}

function fillKeyboard() {
    [..."abcdefghijklmnopqrstuvwxyz"].forEach(letter => {
        let div = document.createElement('div');
        div.className = "keyboard-key";
        div.innerHTML = letter.toUpperCase();
        keyboard_section.append(div);
    });
    keys_divs = document.querySelectorAll(".keyboard-key");
}

function selectKey(key) {
    let letter = key.innerHTML;
    document.querySelectorAll(".letter-answer").forEach(li => {
        if (li.innerHTML == letter && li.style.backgroundColor != "green") {
            key.style.backgroundColor = "green";
            li.style.backgroundColor = "green";
            answered++;
        }
        else if (key.style.backgroundColor != "green") {
            key.style.backgroundColor = "red";
        }
        if (answered > answer.length * 0.5) {
            keyboard_section.style.display = "none";
            answer_input.hidden = false;
            answer_btn.hidden = false;
        }
    });

}

function checkAnswer() {
    let myAns = answer_input.value.toUpperCase();
    if (myAns == answer.toUpperCase()) {
        endGame(true);
    }
    else {
        endGame(false);
    }
}

function endGame(isWin) {
    result_label.innerHTML = isWin ? "You win!" : "You lose!";
    setBackground(isWin);
    answer_btn.disabled = true;
    answer_input.disabled = true;
}

function setBackground(isWin) {
    document.querySelectorAll(".letter-answer").forEach(div => div.style.backgroundColor = isWin ? "green" : "red");
}

function refreshGame() {
    answered = 0;
    result_label.innerHTML = "";
    keys_divs.forEach(key => key.style.backgroundColor = "white");
    word_ul.innerHTML = "";
    answer_input.hidden = true;
    answer_btn.hidden = true;
    keyboard_section.style.display = "flex";
    answer_btn.disabled = false;
    answer_input.disabled = false;
    answer_input.value = '';
}

function setNewAnswerQuestion(){
    let index = Math.floor(Math.random() * (qa[0].length));
    questinDiv.innerText = qa[0][index];
    answer = qa[1][index];
}

fillKeyboard();
gameStart();

keys_divs.forEach(key => {
    key.addEventListener("click", () => selectKey(key));
});
answer_btn.addEventListener("click", checkAnswer);
playAgainButton.addEventListener("click", gameStart);