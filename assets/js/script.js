// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.querySelectorAll("button[data-type]");
    let maxClicksElement = document.getElementById("maxClicks");

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

                alert(`You clicked ${gameType}`);
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
    // Reset maxClicks to 1
    maxClicksElement.innerText = "1";
}


function runGame() {

}
function decideCompChoice() {

}
function results() {

}
function showPlayerScore() {

}
function showCompScore() {

}
function playerScore() {
}
function determineResult() {

}
