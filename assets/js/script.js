const computerChoices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
let maxClicks = 3;
let playerClicks = 0;
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
                if (playerClicks < maxClicks) {
                    runGame(gameType);
                    playerClicks++;
                    checkForWinner();
                }
            }
        });
    }
});

function increaseMaxClicks(maxClicksElement) {
    if (maxClicks < 10) {
        maxClicks++;
        maxClicksElement.innerText = maxClicks;
    }
}

function decreaseMaxClicks(maxClicksElement) {
    if (maxClicks > 3) {
        maxClicks--;
        maxClicksElement.innerText = maxClicks;
    }
}

function resetMaxClicks(maxClicksElement) {
    maxClicks = 3;
    maxClicksElement.innerText = maxClicks;
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

function calculateWinner(playerChoice, computerChoice) {
    console.log("Player Choice:", playerChoice);
    console.log("Computer Choice:", computerChoice);

    let resultDisplay = document.getElementById("resultDisplay");
    let result = "";

    playerChoice = playerChoice.toLowerCase();
    computerChoice = computerChoice.toLowerCase();

    if (playerChoice === computerChoice) {
        result = "Draw!";
    } else if (
        (playerChoice === "rock" && (computerChoice === "scissors" || computerChoice === "lizard")) ||
        (playerChoice === "paper" && (computerChoice === "rock" || computerChoice === "spock")) ||
        (playerChoice === "scissors" && (computerChoice === "paper" || computerChoice === "lizard")) ||
        (playerChoice === "lizard" && (computerChoice === "spock" || computerChoice === "paper")) ||
        (playerChoice === "spock" && (computerChoice === "scissors" || computerChoice === "rock"))
    ) {
        result = "You win!";
        incrementPlayerWins();
    } else {
        result = "Computer wins!";
        incrementComputerWins();
    }

    console.log("Result:", result);

    resultDisplay.innerHTML = result;

    // Check for a winner after each round
    checkForWinner();
}

let playerWins = 0;
let computerWins = 0;

function incrementPlayerWins() {
    playerWins++;
    document.getElementById("wins").textContent = playerWins;
}

function incrementComputerWins() {
    computerWins++;
    document.getElementById("losses").textContent = computerWins;
}
function checkForWinner() {
    if (playerClicks >= maxClicks) {
        endGame("You Win!");
    } else if (playerWins + computerWins === maxClicks) {
        endGame("You Lost!");
    } else if (playerWins + computerWins === maxClicks && playerClicks === maxClicks) {
        endGame("It's a Draw!");
    }
}
function endGame(message) {
    const resultDisplay = document.getElementById("resultDisplay");
    resultDisplay.innerHTML = message;

    // Disable button clicks by removing the event listeners from the buttons
    const buttons = document.querySelectorAll("button[data-type]");
    buttons.forEach(button => {
        button.removeEventListener("click", handleClick);
    });
}
