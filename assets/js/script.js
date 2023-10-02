const computerChoices = ["Rock", "Paper", "Scissors", "Lizard", "Spock"];
let maxClicks = 3;
let playerClicks = 0;
let gameEnded = false; // Add a gameEnded flag

// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("button[data-type]");
    const maxClicksElement = document.getElementById("maxClicks");
    const resetButton = document.querySelector("button[data-type='reset']");
    const winsElement = document.getElementById("wins");
    const lossesElement = document.getElementById("losses");
    const resultDisplay = document.getElementById("resultDisplay");
    const playersChoiceElement = document.getElementById("playersChoice");
    const compChoiceElement = document.getElementById("compChoice");
    const roundResultDisplay = document.getElementById("round-result");

    resetButton.addEventListener("click", function () {
        // Reset wins and game state
        playerWins = 0;
        computerWins = 0;
        winsElement.textContent = playerWins;
        lossesElement.textContent = computerWins;
        resultDisplay.textContent = '';
        playerClicks = 0;
        gameEnded = false;
        maxClicks = 3;
        maxClicksElement.innerText = maxClicks;
        playersChoiceElement.innerHTML = '';
        compChoiceElement.innerHTML = '';
        roundResultDisplay.innerHTML = '';
    });

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
                if (!gameEnded && playerClicks < maxClicks) {
                    runGame(gameType);
                    playerClicks++;
                    checkForWinner();
                }
            }
        });
    }

    function increaseMaxClicks(maxClicksElement) {
        if (maxClicks < 12) {
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

    function checkAndDisplayResult() {
        const yourScoreElement = document.querySelector("#wins");
        const computerScoreElement = document.querySelector("#losses");

        const yourScore = parseInt(yourScoreElement.innerText);
        const computerScore = parseInt(computerScoreElement.innerText);

        if (yourScore > computerScore) {
            roundResultDisplay.innerHTML = "You won this round!";
        } else if (yourScore < computerScore) {
            roundResultDisplay.innerHTML = "You lost this round!";
        } else {
            roundResultDisplay.innerHTML = "It's a draw!";
        }
    }
    function endGame(message) {
        const resultDisplay = document.getElementById("resultDisplay");
        resultDisplay.innerHTML = message;
        gameEnded = true;
        // Display the round result
        checkAndDisplayResult();
    }
});