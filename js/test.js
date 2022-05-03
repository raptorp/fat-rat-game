// alert("hello mellow yellow") ; //
// console.log("hello mellow yellow") ;
// function sayHello(){
//     alert("hello") ;
// }
// document.querySelector("#cheese_sprite") .addEventListener("click", sayHello) ;

// function item_clicked(){

// }

// Create global variables
let lives;
let points;
let gameDuration;

// When the window has loaded the page, the eventlistener 
// "load" is triggered and calls the function "start"
window.addEventListener("load", start);

function start() {
    // Sets the initial values and calls the showTitle()
    console.log('start');
    lives = 10;
    points = 0;
    gameDuration = 60;
    document.querySelector("#current_score").textContent = points;
    document.querySelector("#current_lives").textContent = lives;
    showTitle();
}

function showTitle() {
    console.log('showTitle');
    // Show title screen
    hideAllScreens();
    document.querySelector("#title_screen").classList.remove("hidden");
    // 
    // TODO Stop music
    // TODO Sound control button
    // TODO Play sound
    //
    // --> user clicks start button
    document.querySelector("#button_startgame").addEventListener("click", startGame);
    // --> user clicks instrunctions button
    document.querySelector("#button_instructions").addEventListener("click", showInstructions);
}

function showInstructions() {
    console.log('showInstructions');
    // Show instruction screen
    hideAllScreens();
    document.querySelector("#instructions_screen").classList.remove("hidden");
    // Show start button
    // Show title button
    // Play sound
    // --> user clicks title button
    document.querySelector("#button_title").addEventListener("click", showTitle);
}

function startGame() {
    console.log(`startGame`);
    // Show game screen / UPDATE to more generic method
    hideAllScreens();

    // good elements start falling
    document.querySelector("#cheese_container").classList.add("falling1", "pos1");
    document.querySelector("#egg_container").classList.add("falling3", "pos7");
    document.querySelector("#popcorn_container").classList.add("falling3", "pos3");

    // bad elements start falling
    document.querySelector("#bluecheese_container").classList.add("falling2", "pos4");
    document.querySelector("#candy_container").classList.add("falling2", "pos2");
    document.querySelector("#coffee_container").classList.add("falling2", "pos6");


    // start timer
    showTimer();

    // --> User clicks good item
    document.querySelector("#cheese_container").addEventListener("click", goodItemHit);
    document.querySelector("#egg_container").addEventListener("click", goodItemHit);
    document.querySelector("#popcorn_container").addEventListener("click", goodItemHit);
    // --> good item completes iteration
    document.querySelector("#cheese_container").addEventListener("animationiteration", sqeezeGoodItem);
    document.querySelector("#egg_container").addEventListener("animationiteration", sqeezeGoodItem);
    document.querySelector("#popcorn_container").addEventListener("animationiteration", sqeezeGoodItem);

    // --> User bad item
    document.querySelector("#bluecheese_container").addEventListener("click", badItemHit);
    document.querySelector("#candy_container").addEventListener("click", badItemHit);
    document.querySelector("#coffee_container").addEventListener("click", badItemHit);
    // --> bad item completes iteration
    document.querySelector("#tablet1_container").addEventListener("animationiteration", sqeezeBadItem);
}

function goodItemHit() {
    console.log(`goodItemHit`);
    // "this" holds the element that triggered the eventListener 
    //console.log(this);
    // stop falling
    this.classList.add("stop");

    // rotate apple
    this.firstElementChild.classList.add("rotate");
    // 1 point
    points = points + 1;
    console.log(`Points: ${points}`);
    document.querySelector("#current_score").textContent = points;
    
    // --> restarts apple when rotation completes 
    this.firstElementChild.addEventListener("animationend", restartApple);
}

function sqeezeGoodItem() {
    console.log(`sqeezeGoodItem`);
    // "this" holds the element that triggered the eventListener 
    //console.log(this);
    // removes all classes from the container
    this.classList.value = "";
    // removes all classes from the sprite
    this.firstElementChild.classList.value = "";
    // removes the animationend eventlistener from the sprite
    this.firstElementChild.removeEventListener("animationend", restartApple);
    // jumps a javascript frame 
    this.offsetHeight;

    let randomPosition = generateRandomNumber(8);
    this.classList.add("falling1", "pos" + randomPosition);
}
function restartApple() {
    console.log(`restartApple`);
    // "this" holds the element that triggered the eventListener 
    //console.log(this);
    // removes all classes from the container
    this.parentElement.classList.value = "";
    // removes all classes from the sprite
    this.classList.value = "";
    // removes the animationend eventlistener from the sprite
    this.removeEventListener("animationend", restartApple);
    // jumps a javascript frame 
    this.parentElement.offsetHeight;

    let randomPosition = generateRandomNumber(8);
    this.parentElement.classList.add("falling1", "pos" + randomPosition);
}

function badItemHit() {
    console.log(`badItemHit`);
    // stop falling
    //this.classList.add("stop");

    // rotate tablet
    this.firstElementChild.classList.add("rotate");

    //lives
    lives = lives - 1;
    console.log(`Lives: ${lives}`);
    document.querySelector("#current_lives").textContent = lives;
    if (lives < 1) {
        gameOver();
    }

    // --> restarts tablet when rotation completes 
    this.firstElementChild.addEventListener("animationend", restartTablet);
}

function sqeezeBadItem() {
    console.log(`restartTablet`);
    //console.log(this);
    this.classList.value = "";
    this.firstElementChild.classList.value = "";
    this.firstElementChild.removeEventListener("animationend", restartTablet)

    this.offsetHeight;

    let randomFalling = generateRandomNumber(3);
    let randomPosition = generateRandomNumber(8);
    this.classList.add("falling" + randomFalling, "pos" + randomPosition);
}

function restartTablet() {
    console.log(`restartTablet`);
    //console.log(this);
    this.parentElement.classList.value = "";
    this.classList.value = "";
    this.removeEventListener("animationend", restartTablet)

    this.offsetHeight;

    let randomFalling = generateRandomNumber(3);
    let randomPosition = generateRandomNumber(8);
    this.parentElement.classList.add("falling" + randomFalling, "pos" + randomPosition);
}

function generateRandomNumber(num) {
    return Math.floor(Math.random() * num) + 1;
}

function showTimer() {
    //console.log(`showTimer`);
    gameDuration = gameDuration - 1;
    // update the user interface
    document.querySelector("#time_left").textContent = gameDuration;
    // then call the countTime function
    countTime();
}

function countTime() {
    //console.log(`countTime`);
    if (gameDuration > 0) {
        // if there is still time left, wait a second and call the showTimer function again
        setTimeout(showTimer, 1000);
    } else {
        gameOver();
    }
}

function gameOver() {
    console.log('gameOver');
    // remove all animations
    document.querySelector("#cheese_container").classList.value="";
    document.querySelector("#egg_container").classList.value="";
    document.querySelector("#popcorn_container").classList.value="";
    document.querySelector("#tablet1_container").classList.value="";

    document.querySelector("#cheese_container").removeEventListener("click", goodItemHit);
    document.querySelector("#egg_container").removeEventListener("click", goodItemHit);
    document.querySelector("#popcorn_container").removeEventListener("click", goodItemHit);
    document.querySelector("#tablet1_container").removeEventListener("click", badItemHit);

    document.querySelector("#cheese_container").removeEventListener("animationiteration", sqeezeGoodItem);
    document.querySelector("#egg_container").removeEventListener("animationiteration", sqeezeGoodItem);
    document.querySelector("#popcorn_container").removeEventListener("animationiteration", sqeezeGoodItem);
    document.querySelector("#tablet1_container").removeEventListener("animationiteration", sqeezeBadItem);

    // win or lose
    if(points > 0 && lives > 0) {
        winning();
    } else {
        losing();
    }
}

function winning() {
    console.log(`winning`);
    document.querySelector("#win_screen").classList.remove("hidden");
    document.querySelector("#win_playgame").addEventListener("click", start);
}

function losing() {
    console.log(`losing`);
    document.querySelector("#lose_screen").classList.remove("hidden");
    document.querySelector("#lose_playgame").addEventListener("click", start);
}

function hideAllScreens() {
    document.querySelector("#title_screen").classList.add("hidden");
    document.querySelector("#instructions_screen").classList.add("hidden");
    document.querySelector("#win_screen").classList.add("hidden");
    document.querySelector("#lose_screen").classList.add("hidden");
}
