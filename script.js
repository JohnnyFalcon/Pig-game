"use strict";

const intro = document.querySelector(".intro");
const overlay = document.querySelector(".overlay");
const close = document.querySelector(".close");
const htp = document.querySelector(".htp");
const roll = document.querySelector(".btnRoll");

let randomNum = Math.trunc(Math.random() * 6) + 1;
let num = 0;

let currentScore = 0;
let currentScore2 = 0;
let score = 0;
let score2 = 0;

function Playe1Wins(score) {
  if (score >= 100) {
    document.querySelector(".box1").classList.add("winB");
    document.querySelector(".p1").classList.add("winP");
    document.querySelector("#score-1").classList.add("winP");
    document.querySelector(".box2").classList.add("opacity");
    document.querySelector(".box1").classList.remove("opacity");
    roll.removeEventListener("click", rolling);
    document.querySelector(".dice").classList.add("hiddenD");
    document.querySelector("#score-1").textContent = "Winner !";
  }
}

function Playe2Wins(score) {
  if (score >= 100) {
    document.querySelector(".box2").classList.add("winB");
    document.querySelector(".p2").classList.add("winP");
    document.querySelector("#score-2").classList.add("winP");
    document.querySelector(".box1").classList.add("opacity");
    document.querySelector(".box2").classList.remove("opacity");
    roll.removeEventListener("click", rolling);
    document.querySelector(".dice").classList.add("hiddenD");
    document.querySelector("#score-2").textContent = "Winner !";
  }
}

function closeIntro() {
  intro.classList.add("hidden");
  overlay.classList.add("hidden");
}

htp.addEventListener("click", function () {
  intro.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

overlay.addEventListener("click", closeIntro);
close.addEventListener("click", closeIntro);

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !intro.classList.contains("hidden")) {
    closeIntro();
  }
});

roll.addEventListener("click", rolling);

document.querySelector(".btnHold").addEventListener("click", function () {
  if (document.querySelector(".box2").classList.contains("opacity")) {
    score += currentScore;
    document.querySelector("#score-1").textContent = score;
  } else {
    score2 += currentScore2;
    document.querySelector("#score-2").textContent = score2;
  }

  currentScore = 0;
  currentScore2 = 0;
  document.querySelector("#currentScore-1").textContent = currentScore;
  document.querySelector("#currentScore-2").textContent = currentScore2;

  switchPlayer();
  Playe1Wins(score);
  Playe2Wins(score2);
});

function rolling() {
  document.querySelector(".dice").classList.remove("hiddenD");
  document
    .querySelector(".dice")
    .setAttribute("src", `photos/dice-${randomNum}.png`);

  if (document.querySelector(".box2").classList.contains("opacity")) {
    if (randomNum !== 1) {
      currentScore += randomNum;
      document.querySelector("#currentScore-1").textContent = currentScore;
    } else {
      currentScore = 0;
      switchPlayer();
      document.querySelector("#currentScore-1").textContent = currentScore;
    }
  } else {
    if (randomNum !== 1) {
      currentScore2 += randomNum;
      document.querySelector("#currentScore-2").textContent = currentScore2;
    } else {
      currentScore2 = 0;
      switchPlayer();
      document.querySelector("#currentScore-2").textContent = currentScore2;
    }
  }

  randomNum = Math.trunc(Math.random() * 6) + 1;
}

function switchPlayer() {
  if (num % 2 === 0) {
    document.querySelector(".box1").classList.add("opacity");
    document.querySelector(".box2").classList.remove("opacity");
  } else {
    document.querySelector(".box2").classList.add("opacity");
    document.querySelector(".box1").classList.remove("opacity");
  }
  num++;
}

document.querySelector(".btnNew").addEventListener("click", function () {
  randomNum = Math.trunc(Math.random() * 6) + 1;
  num = 0;
  currentScore = 0;
  currentScore2 = 0;
  score = 0;
  score2 = 0;
  document.querySelector("#score-2").textContent = 0;
  document.querySelector("#score-1").textContent = 0;

  document.querySelector(".box1").classList.remove("winB");
  document.querySelector(".p1").classList.remove("winP");
  document.querySelector("#score-1").classList.remove("winP");
  document.querySelector(".box2").classList.remove("winB");
  document.querySelector(".p2").classList.remove("winP");
  document.querySelector("#score-2").classList.remove("winP");
  document.querySelector(".dice").classList.add("hiddenD");

  document.querySelector(".box2").classList.add("opacity");
  document.querySelector(".box1").classList.remove("opacity");
  roll.addEventListener("click", rolling);
});
