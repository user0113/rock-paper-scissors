//getPlayerChoice function returns player choice if valid, undefined if not
function getPlayerChoice() {
    const choice = prompt(("Rock, paper, or scissors?")).toUpperCase();
    if (choice !== "ROCK" && (choice !== "PAPER") && (choice !== "SCISSORS")) {
        return undefined;
    } else {
        return choice;
    }
}
//getComChoice function generates com choice based on random generated number
function getComChoice() {
    let choice = getRandom(1, 3);
    if (choice === 1) {
        return "ROCK";
    } else if (choice === 2) {
        return "PAPER";
    } else {
        return "SCISSORS";
    }
}
//getRandom function rng generator for com choice
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//function compares player and com selection to determine round winner
function playRound(playerSelection, computerSelection) {
    if (playerSelection == undefined) {
        return "INVALID!";
    }
    else if (playerSelection == computerSelection) {
        console.log(playerSelection + " and " + computerSelection + ".")
        return "It's a tie!";
    } else if (playerSelection == "ROCK" && computerSelection == "SCISSORS"
            || playerSelection == "PAPER" && computerSelection == "ROCK"
            || playerSelection == "SCISSORS" && computerSelection == "PAPER") {
                console.log(playerSelection + " beats " + computerSelection + ".")
                return "You win!";
    } else {
        console.log(computerSelection + " beats " + playerSelection + ".")
        return "You lose!";
    }
}