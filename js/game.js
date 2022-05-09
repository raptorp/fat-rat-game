// ---------------------- GLOBAL VARIABLES ----------------------
let lives;
let points;
let gameDuration;

window.addEventListener("load", start);

// ----------------------- INITIAL VALUES -----------------------
function start() {
  lives = 3;
  points = 0;
  gameDuration = 2000;
  maxPoints = 9;
  ratGetsFatter(points);
  for (let i = 1; i <= lives; i++) {
    document.querySelector(`#heart_${i}`).classList.remove("heart_empty");
  }
  showTitle();
}

// ------------------------- TITLE SCREEN ------------------------
function showTitle() {
  hideAllScreens();
  document.querySelector("#title_screen").classList.remove("hidden");
  document
    .querySelector("#button_startgame")
    .addEventListener("click", startGame);
  document
    .querySelector("#button_instructions")
    .addEventListener("click", showInstructions);
}

// --------------------- INSTRUCTIONS SCREEN ----------------------
function showInstructions() {
  hideAllScreens();
  document.querySelector("#instructions_screen").classList.remove("hidden");
  document.querySelector("#button_title").addEventListener("click", showTitle);
}

// ------------------------- AUDIO ------------------------

let gameSoundtrack = new Audio("../sound/soundtrack.mp3");
let goodSound = new Audio("../sound/crunch.mp3");
let badSound = new Audio("../sound/gag.mp3");
let gameWonSound = new Audio("../sound/cheer.mp3");
let gameLostSound = new Audio("../sound/boo.mp3");

// ------------------------- GAME STARTING ------------------------
function startGame() {
  hideAllScreens();
  gameSoundtrack.currentTime = 0;
  gameSoundtrack.play();
  gameSoundtrack.loop = true;
  // good elements
  document.querySelector("#cheese_container").classList.add("falling1", "pos1");
  document.querySelector("#egg_container").classList.add("falling3", "pos7");
  document
    .querySelector("#popcorn_container")
    .classList.add("falling3", "pos3");

  // bad elements
  document
    .querySelector("#bluecheese_container")
    .classList.add("falling2", "pos4");
  document.querySelector("#candy_container").classList.add("falling2", "pos2");
  document.querySelector("#coffee_container").classList.add("falling2", "pos6");

  // timer
  showTimer();

  // ------------------- INTERACTION: GOOD ITEM -------------------
  document
    .querySelector("#cheese_container")
    .addEventListener("click", goodItemHit);
  document
    .querySelector("#egg_container")
    .addEventListener("click", goodItemHit);
  document
    .querySelector("#popcorn_container")
    .addEventListener("click", goodItemHit);

  document
    .querySelector("#cheese_container")
    .addEventListener("animationiteration", sqeezeGoodItem);
  document
    .querySelector("#egg_container")
    .addEventListener("animationiteration", sqeezeGoodItem);
  document
    .querySelector("#popcorn_container")
    .addEventListener("animationiteration", sqeezeGoodItem);

  // -------------------- INTERACTION: BAD ITEM --------------------
  document
    .querySelector("#bluecheese_container")
    .addEventListener("click", badItemHit);
  document
    .querySelector("#candy_container")
    .addEventListener("click", badItemHit);
  document
    .querySelector("#coffee_container")
    .addEventListener("click", badItemHit);

  document
    .querySelector("#bluecheese_container")
    .addEventListener("animationiteration", sqeezeBadItem);
  document
    .querySelector("#candy_container")
    .addEventListener("animationiteration", sqeezeBadItem);
  document
    .querySelector("#coffee_container")
    .addEventListener("animationiteration", sqeezeBadItem);
}

// --------------------------- POINT RAT ---------------------------
function ratGetsFatter(points) {
  let pointRat = document.querySelector("#point_rat");
  pointRat.style.backgroundImage = `url("../graphics/point_${points}.svg")`;
  if (points <= 5) {
    pointRat.style.aspectRatio = 89 / 150;
    pointRat.style.right = "5%";
  } else if (points == 6) {
    pointRat.style.aspectRatio = 46 / 75;
    pointRat.style.right = "5%";
  } else if (points == 7) {
    pointRat.style.aspectRatio = 31 / 50;
    pointRat.style.right = "5%";
  } else if (points == 8) {
    pointRat.style.aspectRatio = 7 / 10;
    pointRat.style.right = "4.5%";
  } else if (points == 9) {
    pointRat.style.aspectRatio = 4 / 5;
    pointRat.style.right = "3.5%";
  }
}

// --------------------- GOOD ELEMENTS & POINTS ---------------------
function goodItemHit() {
  this.removeEventListener("click", goodItemHit);
  goodSound.currentTime = 0;
  goodSound.play();
  this.classList.add("stop");
  this.firstElementChild.classList.add("rotate");
  points = points + 1;
  console.log(`Points: ${points}`);
  ratGetsFatter(points);
  if (points == maxPoints) {
    gameOver();
  }
  this.firstElementChild.addEventListener("animationend", restartGoodItem);
}

function sqeezeGoodItem() {
  this.classList.value = "";
  this.firstElementChild.classList.value = "";
  this.firstElementChild.removeEventListener("animationend", restartGoodItem);
  this.offsetHeight;
  let randomPosition = generateRandomNumber(8);
  this.classList.add("falling1", "pos" + randomPosition);
}

function restartGoodItem() {
  console.log(`restartGoodItem`);
  this.parentElement.classList.value = "";
  this.classList.value = "";
  this.removeEventListener("animationend", restartGoodItem);
  this.parentElement.offsetHeight;

  let randomPosition = generateRandomNumber(8);
  this.parentElement.classList.add("falling1", "pos" + randomPosition);
  this.parentElement.addEventListener("click", goodItemHit);
}

// --------------------- BAD ELEMENTS & HEALTH ----------------------
function heartUpdate(life) {
  console.log("heart_amount updated");
  document.querySelector(`#heart_${life}`).classList.add("heart_empty");
}

function badItemHit() {
  this.removeEventListener("click", badItemHit);
  badSound.currentTime = 0;
  badSound.play();
  this.classList.add("stop");
  this.firstElementChild.classList.add("rotate");
  lives = lives - 1;
  heartUpdate(lives + 1);
  if (lives < 1) {
    gameOver();
  }
  this.firstElementChild.addEventListener("animationend", restartBadItem);
}

function sqeezeBadItem() {
  this.classList.value = "";
  this.firstElementChild.classList.value = "";
  this.firstElementChild.removeEventListener("animationend", restartBadItem);
  this.offsetHeight;
  let randomFalling = generateRandomNumber(3);
  let randomPosition = generateRandomNumber(8);
  this.classList.add("falling" + randomFalling, "pos" + randomPosition);
}

function restartBadItem() {
  this.parentElement.classList.value = "";
  this.classList.value = "";
  this.removeEventListener("animationend", restartBadItem);
  this.offsetHeight;
  let randomFalling = generateRandomNumber(3);
  let randomPosition = generateRandomNumber(8);
  this.parentElement.classList.add(
    "falling" + randomFalling,
    "pos" + randomPosition
  );
  this.parentElement.addEventListener("click", badItemHit);
}

// ----------------------- "RANDOM" POSITION -----------------------
function generateRandomNumber(num) {
  return Math.floor(Math.random() * num) + 1;
}

// ----------------------------- TIMER ------------------------------
function fromSecondsToTimer(seconds) {
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
}

function showTimer() {
  gameDuration -= 1;
  document.querySelector("#time_left").textContent =
    fromSecondsToTimer(gameDuration);
  countTime();
}

function countTime() {
  if (gameDuration > 0) {
    setTimeout(showTimer, 1000);
  } else {
    gameOver();
  }
}

// ---------------------------- GAME OVER ----------------------------
function gameOver() {
  // reset timer
  gameDuration = 0;

  document.querySelector("#cheese_container").classList.value = "";
  document.querySelector("#egg_container").classList.value = "";
  document.querySelector("#popcorn_container").classList.value = "";
  document.querySelector("#bluecheese_container").classList.value = "";
  document.querySelector("#candy_container").classList.value = "";
  document.querySelector("#coffee_container").classList.value = "";

  document
    .querySelector("#cheese_container")
    .removeEventListener("click", goodItemHit);
  document
    .querySelector("#egg_container")
    .removeEventListener("click", goodItemHit);
  document
    .querySelector("#popcorn_container")
    .removeEventListener("click", goodItemHit);
  document
    .querySelector("#bluecheese_container")
    .removeEventListener("click", badItemHit);
  document
    .querySelector("#candy_container")
    .removeEventListener("click", badItemHit);
  document
    .querySelector("#coffee_container")
    .removeEventListener("click", badItemHit);

  document
    .querySelector("#cheese_container")
    .removeEventListener("animationiteration", sqeezeGoodItem);
  document
    .querySelector("#egg_container")
    .removeEventListener("animationiteration", sqeezeGoodItem);
  document
    .querySelector("#popcorn_container")
    .removeEventListener("animationiteration", sqeezeGoodItem);
  document
    .querySelector("#bluecheese_container")
    .removeEventListener("animationiteration", sqeezeBadItem);
  document
    .querySelector("#candy_container")
    .removeEventListener("animationiteration", sqeezeBadItem);
  document
    .querySelector("#coffee_container")
    .removeEventListener("animationiteration", sqeezeBadItem);

  // ------------------------ WIN/LOSE CONDITIONS ------------------------
  if (points > 0 && lives > 0) {
    winning();
  } else {
    losing();
  }
}

function winning() {
  gameSoundtrack.loop = false;
  gameSoundtrack.pause();
  document.querySelector("#win_screen").classList.remove("hidden");
  gameWonSound.play(0);
  let buttonWinTitle = document.querySelector("#button_win_title");
  buttonWinTitle.disabled = true;
  setTimeout(() => {
    buttonWinTitle.addEventListener("click", start);
    buttonWinTitle.disabled = false;
  }, 1000);
}

function losing() {
  gameSoundtrack.loop = false;
  gameSoundtrack.pause();
  document.querySelector("#lose_screen").classList.remove("hidden");
  gameLostSound.play(0);
  let buttonLostTitle = document.querySelector("#button_lost_title");
  buttonLostTitle.disabled = true;
  setTimeout(() => {
    buttonLostTitle.addEventListener("click", start);
    buttonLostTitle.disabled = false;
  }, 1000);
}

function hideAllScreens() {
  document.querySelector("#title_screen").classList.add("hidden");
  document.querySelector("#instructions_screen").classList.add("hidden");
  document.querySelector("#win_screen").classList.add("hidden");
  document.querySelector("#lose_screen").classList.add("hidden");
}
