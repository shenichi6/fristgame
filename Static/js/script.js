// SCREENS
const mainMenu = document.getElementById("main-menu");

const modeSelect = document.getElementById("mode-select");

const characterSelect =
document.getElementById("character-select");


// BUTTONS
const playButton =
document.getElementById("play-btn");

const aiModeButton =
document.getElementById("ai-mode-btn");

const startGameButton =
document.getElementById("start-game-btn");


// CHARACTER CARDS
const characterCards =
document.querySelectorAll(".character-card");


// GAME DATA
let selectedMode = "";
let selectedCharacter = "";


// PLAY BUTTON
playButton.addEventListener("click", function(){

    mainMenu.classList.add("hidden");

    modeSelect.classList.remove("hidden");

});


// AI MODE
aiModeButton.addEventListener("click", function(){

    selectedMode = "AI";

    modeSelect.classList.add("hidden");

    characterSelect.classList.remove("hidden");

});


// CHARACTER SELECT
characterCards.forEach(function(card){

    card.addEventListener("click", function(){

        characterCards.forEach(function(c){

            c.classList.remove("selected");

        });

        card.classList.add("selected");

        selectedCharacter =
        card.dataset.character;

        console.log(selectedCharacter);

    });

});


// START GAME
startGameButton.addEventListener("click", function(){

    if(selectedCharacter === ""){

        alert("Choose a character!");

        return;
    }

    alert(
        "Starting game as " +
        selectedCharacter +
        " in " +
        selectedMode +
        " mode!"
    );

});