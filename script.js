const words = ["سلام", "بيتس", "كتاب", "شجرة", "نورس", "مكتب", "كرسي"]; // قائمة الكلمات الممكنة
const secretWord = words[Math.floor(Math.random() * words.length)]; // اختيار كلمة عشوائية
let attempts = 6;

document.addEventListener("DOMContentLoaded", () => {
    createBoard();
});

function createBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";
    for (let i = 0; i < attempts * 5; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
    }
}

function submitGuess() {
    let input = document.getElementById("guess-input").value.trim().toLowerCase();
    if (input.length !== 5) {
        document.getElementById("message").innerText = "يجب أن تكون الكلمة مكونة من 5 أحرف!";
        return;
    }
    if (!words.includes(input)) {
        document.getElementById("message").innerText = "الكلمة غير موجودة في القاموس!";
        return;
    }

    let boardCells = document.querySelectorAll(".cell");
    let rowIndex = (6 - attempts) * 5;

    for (let i = 0; i < 5; i++) {
        let cell = boardCells[rowIndex + i];
        cell.innerText = input[i];

        if (input[i] === secretWord[i]) {
            cell.classList.add("correct");
        } else if (secretWord.includes(input[i])) {
            cell.classList.add("present");
        } else {
            cell.classList.add("absent");
        }
    }

    attempts--;
    document.getElementById("guess-input").value = "";
    if (input === secretWord) {
        document.getElementById("message").innerText = "مبروك! لقد ربحت!";
        disableInput();
    } else if (attempts === 0) {
        document.getElementById("message").innerText = `انتهت المحاولات! الكلمة كانت: ${secretWord}`;
        disableInput();
    }
}

function disableInput() {
    document.getElementById("guess-input").disabled = true;
    document.querySelector("button").disabled = true;
}