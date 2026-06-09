let gameSeq=[];
let userSeq=[];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

function getHighScore() {
    return Number(localStorage.getItem("simonHighScore")) || 0;
}

function storeHighScore(score) {
    let highScore = getHighScore();
    if (score > highScore) {
        localStorage.setItem("simonHighScore", score);
        return score;
    }
    return highScore;
}

let highScore = getHighScore();
if (highScore > 0) {
    h2.innerText = `Press any key to start (High score: ${highScore})`;
}

document.addEventListener("keypress", function () {
    if(started == false) {
        console.log("game is started");
        started = true;

        levelUp();
    }
});

const FLASH_DURATION = 400;

function triggerFlash(btn, className) {
    btn.classList.remove(className);
    void btn.offsetWidth;
    btn.classList.add(className);
    setTimeout(function () {
        btn.classList.remove(className);
    }, FLASH_DURATION);
}

function gameFlash(btn) {
    triggerFlash(btn, "flash");
}

function userFlash(btn) {
    triggerFlash(btn, "userflash");
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
};

function checkAns(idx) {
    if(userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        let highScore = storeHighScore(level);
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> High score: <b>${highScore}</b> <br> Press any key to start`;
        document.body.classList.add("game-over-flash");
        setTimeout(function () {
            document.body.classList.remove("game-over-flash");
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("pointerdown", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}