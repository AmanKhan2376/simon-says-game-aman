// Selectors
let h2 = document.querySelector("h2");
let allBoxes = document.querySelectorAll(".box");
let h3 = document.querySelector("h3");

// Data
let isStarted = false;
let level     = 0;
let highScore = 0;

let boxes = ["one", "two", "three", "four"];

let autoSeq = [];
let userSeq = [];

// Event Listeners
document.addEventListener("keypress", function () {
    if (!isStarted) {
        isStarted = true;
        levelUp();
    }
});

for (let box of allBoxes) {
    box.addEventListener("click", boxClick);
}

// Helper functions
function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomBox = document.querySelector(`.${boxes[randomIdx]}`);
    autoSeq.push(randomBox.getAttribute("id"));
    autoBoxFlash(randomBox);
}

function autoBoxFlash(box) {
    box.classList.add("flash");
    setTimeout(function () {
        box.classList.remove("flash");
    }, 250);
}

function userBoxFlash(box) {
    box.classList.add("user-flash");
    setTimeout(function () {
        box.classList.remove("user-flash");
    }, 250);
}

function boxClick() {
    if (!isStarted) {
        return;
    }

    let box = this;
    userBoxFlash(box);

    let userChoice = box.getAttribute("id");
    userSeq.push(userChoice);

    compare(userSeq.length - 1);
}

function compare(currIdx) {
    if (userSeq[currIdx] === autoSeq[currIdx]) {
        if (userSeq.length == autoSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 250);
        h2.innerHTML = `GAME OVER! Your score was ${level - 1} <br> Press any key to start`;
        if (level - 1 > highScore) {
            highScore = level - 1;
        }
        h3.innerText = `Highscore: ${highScore}`;
        reset();
    }
}

function reset() {
    isStarted = false;
    autoSeq = [] ;
    userSeq = [];
    level = 0;
}