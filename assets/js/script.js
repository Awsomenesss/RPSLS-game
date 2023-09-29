const computerChoices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];

// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll("button[data-type]");
    let maxClicksElement = document.getElementById("maxClicks");
    const playerChoiceElement = document.getElementById("playersChoice");
    const compChoiceElement = document.getElementById("compChoice");

    // Add click event listeners to all buttons
    for (let button of buttons) {
        button.addEventListener("click", function () {
            let gameType = this.getAttribute("data-type");

            // Handle the increment and decrement buttons
            if (gameType === "increase") {
                increaseMaxClicks(maxClicksElement);
            } else if (gameType === "decrease") {
                decreaseMaxClicks(maxClicksElement);
            } else if (gameType === "reset") {
                resetMaxClicks(maxClicksElement);
            } else {
                runGame(gameType, playerChoiceElement, compChoiceElement);
            }
        });
    }
});

function increaseMaxClicks(maxClicksElement) {
    let maxClicks = parseInt(maxClicksElement.innerText);
    if (maxClicks < 10) {
        maxClicks++;
        maxClicksElement.innerText = maxClicks;
    }
}

function decreaseMaxClicks(maxClicksElement) {
    let maxClicks = parseInt(maxClicksElement.innerText);
    if (maxClicks > 1) {
        maxClicks--;
        maxClicksElement.innerText = maxClicks;
    }
}

function resetMaxClicks(maxClicksElement) {
    maxClicksElement.innerText = "1";
}

function runGame(gameType, playerChoiceElement, compChoiceElement) {
    const computerChoiceIndex = Math.floor(Math.random() * computerChoices.length);
    const computerChoice = computerChoices[computerChoiceIndex];

    // Update the DOM elements
    playerChoiceElement.innerText = gameType;
    compChoiceElement.innerText = computerChoice;
}
function results() {

}
function showPlayerScore() {

}
function showCompScore() {

}

function determineResult() {

}
