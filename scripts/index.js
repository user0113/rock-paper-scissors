//prompts player for rps choice, generates com choice 
var playerSelection = getPlayerChoice((consoleInput = prompt("Rock, paper, or scissors?")).toUpperCase());
var computerSelection = getComChoice();

//getPlayerChoice function returns player choice if valid, undefined if not
function getPlayerChoice(choice) {
    if (choice !== "ROCK" && (choice !== "PAPER") && (choice !== "SCISSORS")) {
        console.log(choice);
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
//game functionloops through game 5 times
function game() {
    //counters used to determine victor and number of rounds
    var playerCounter = 0;
    var comCounter = 0;
    var tie = 0;
    function playRound(playerSelection, computerSelection) {
        if (playerSelection == undefined) {
            return "INVALID!";
        }
        else if (playerSelection == computerSelection) {
            console.log(playerSelection + " and " + computerSelection + ".")
            tie++;
            return "It's a tie!";
        } else if (playerSelection == "ROCK" && computerSelection == "SCISSORS"
                || playerSelection == "PAPER" && computerSelection == "ROCK"
                || playerSelection == "SCISSORS" && computerSelection == "PAPER") {
                    console.log(playerSelection + " beats " + computerSelection + ".")
                    playerCounter++;
                    return "You win!";
        } else {
            console.log(computerSelection + " beats " + playerSelection + ".")
            comCounter++;
            return "You lose!";
        }
    }
    for (let i = 0; i < 5; i++) {
        var result = playRound(playerSelection, computerSelection);
        if (result == "INVALID!") {
            console.log(i);
            i--;
            console.log(i);
            console.log(result);
            break;
        }
        console.log(result);
        //prevents extra prompt on 5th round
        if ((tie + playerCounter + comCounter) == 5) {break;}
        playerSelection = getPlayerChoice((consoleInput = prompt("Rock, paper, or scissors?")).toUpperCase());
        computerSelection = getComChoice();
    }
    if (playerCounter == comCounter) {
        return 'Amazingly, the match is a tie!';
    } else if (playerCounter > comCounter) {
        return "You win the match!";
    } else {
        return "You lost the match!"
    }
}
console.log(game());