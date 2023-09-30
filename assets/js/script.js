const computerChoices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("button[data-type]");
    const maxClicksElement = document.getElementById("maxClicks");

    for (const button of buttons) {
        button.addEventListener("click", function () {
            const gameType = this.getAttribute("data-type");

            if (gameType === "increase") {
                increaseMaxClicks(maxClicksElement);
            } else if (gameType === "decrease") {
                decreaseMaxClicks(maxClicksElement);
            } else if (gameType === "reset") {
                resetMaxClicks(maxClicksElement);
            } else {
                runGame(gameType);
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

function runGame(gameType) {
    const computerChoice = generateComputerChoice();
    updatePlayerChoice(gameType);
    updateComputerChoice(computerChoice);
    calculateWinner(gameType, computerChoice);
}

function generateComputerChoice() {
    const computerChoiceIndex = Math.floor(Math.random() * computerChoices.length);
    return computerChoices[computerChoiceIndex];
}

function updatePlayerChoice(gameType) {
    const playerChoiceButton = document.querySelector(`button[data-type="${gameType}"]`);
    const playerChoiceHTML = playerChoiceButton.outerHTML;
    document.getElementById("playersChoice").innerHTML = playerChoiceHTML;
}

function updateComputerChoice(computerChoice) {
    const compChoiceButton = document.querySelector(`button[data-type="${computerChoice.toLowerCase()}"]`);
    const compChoiceHTML = compChoiceButton.outerHTML;
    document.getElementById("compChoice").innerHTML = compChoiceHTML;
}
