// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {   
             let choice = this.getAttribute("data-type");
             alert(`You clicked ${choice}`);
        });
    }
});

function runGame(){};
function updateAttemptCounter(){};
function generateComputerChoice(){};
function updateGameDisplay(){};
function incrementComputerScore(){};
function incrementPlayerScore(){};
function calculateResult(){};
