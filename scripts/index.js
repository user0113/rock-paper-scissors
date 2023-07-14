/* Old logic for RPS
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
 Old logic for RPS */

//functions to play or change BGM
const battleBGM = document.getElementById("battleMusic");
const victoryBGM = document.getElementById("victoryMusic");
const lossBGM = document.getElementById("lossMusic");

function playBattleMusic() {
    pauseBackgroundMusic();
    battleBGM.volume = 0.2;
    battleBGM.play();
}

function playVictoryMusic() {
    pauseBackgroundMusic();
    victoryBGM.volume = 0.2;
    victoryBGM.play();
}

function playLossMusic() {
    pauseBackgroundMusic();
    lossBGM.volume = 0.2;
    lossBGM.play();
}
  
function pauseBackgroundMusic() {
    battleBGM.pause();
    battleBGM.currentTime = 0;
    victoryBGM.pause();
    victoryBGM.currentTime = 0;
    lossBGM.pause();
    lossBGM.currentTime = 0;
}

//used to determine first time to play BGM once user interacts with page
let hasUserInteracted = false;

//stores victory/loss result to display as a message for the palyer
let result = "";
//stores whether a full match has just been palyed
let state = 0;

//functions to increase player and computer scores
const p1counter = document.getElementById("p1counter");
const p2counter = document.getElementById("p2counter");
let p1value = parseInt(p1counter.textContent);
let p2value = parseInt(p2counter.textContent);

function incrementp1Counter() {
  p1value++;
  p1counter.textContent = p1value;
}

function incrementp2Counter() {
    p2value++;
    p2counter.textContent = p2value;
}

function resetCounters () {
    p1value = 0;
    p2value = 0;
    p1counter.textContent = p1value;
    p2counter.textContent = p2value;
}

//function to compare player and com selection to determine winner of RPS round
function playRound(playerSelection, computerSelection) {
    const div = document.querySelector("#msg");
    div.classList.remove("change");
    /*if (playerSelection == undefined) {
        return "INVALID!";
    }
    else */
    if (playerSelection == computerSelection) {
        console.log(playerSelection + " and " + computerSelection + ".")
        div.classList.add("change");
        div.textContent = "It's a tie!";
        return "It's a tie!";
    } else if (playerSelection == "ROCK" && computerSelection == "SCISSORS"
            || playerSelection == "PAPER" && computerSelection == "ROCK"
            || playerSelection == "SCISSORS" && computerSelection == "PAPER") {
                console.log(playerSelection + " beats " + computerSelection + ".")
                div.classList.add("change");
                incrementp1Counter();
                console.log(p1value)
                if (p1value === 5) {
                    div.textContent = "Match won!";
                    state = 1;
                    playVictoryMusic();
                    return "You won the match!"
                }
                div.textContent = "You win!";
                return "You win!"
    } else {
        console.log(computerSelection + " beats " + playerSelection + ".")
        div.classList.add("change");
        incrementp2Counter();
        if (p2value === 5) {
            div.textContent = "Match lost!";
            state = 1;
            playLossMusic();
            return "You lost the match!";
        }
        div.textContent = "You lose!";
        return "You lose!";
    }
}

//adds character pressed by player to "selected" class, makes it glow
const divs = document.getElementsByClassName("pChoice");
Array.from(divs).forEach(div => {
    div.addEventListener("mousedown", function() {
        if (!hasUserInteracted) {
            playBattleMusic();
            hasUserInteracted = true;
        }
        const pressedDivID = this.id;
        this.classList.add("selected");

        Array.from(divs).forEach(otherDiv => {
            if (otherDiv.id !== pressedDivID) {
              otherDiv.classList.remove("selected");
            }
          });
    });
  });

//disable mouse presses on the entire page
function disableMousePresses() {
    // Set pointer-events to 'none' for the <body> element
    document.body.style.pointerEvents = "none";
}
  
//enable mouse presses on the entire page
function enableMousePresses() {
    //set pointer-events to 'auto' for the <body> element
    document.body.style.pointerEvents = "auto";
}

//plays a round of RPS if player has selected champion
const playDiv = document.querySelector(".playButton");
playDiv.addEventListener("mousedown", function handleMouse() {
    if (!hasUserInteracted) {
        playBattleMusic();
        hasUserInteracted = true;
    }
    if (state == 1) {
        playBattleMusic();
        resetCounters();
        const div = document.querySelector("#msg");
        div.textContent = "";
        state = 0;
    }
    const className = "selected";
    const elements = document.querySelectorAll("." + className);
    if (elements.length > 0) {
        //disables mouse presses to prevent cheating, highlights all enemies, then chooses 1
        disableMousePresses();
        const divs = document.querySelectorAll(".cChoice");
        divs.forEach((div) => {
            div.classList.add("selected");
        });
        //enemy choice made after a 2 second delay
        const delay = 2000;
        let timerId;
        clearTimeout(timerId);
        timerId = setTimeout(function() {
            //generates random number from 1-3, selects div from index of all divs CPU can choose,only leaves choosen div in "selected" class
            const divs = document.querySelectorAll(".cChoice.selected");
            const randomIndex = Math.floor(Math.random() * divs.length);
            const randomDiv = divs[randomIndex];
            const randomId = randomDiv.id;
            Array.from(divs).forEach(div => {
                if (div.id !== randomId) {
                  div.classList.remove("selected");
                }
              });
            //takes player and com choice, adds to "played" class, moves them to the middle 
            const divs2 = document.querySelectorAll(".selected");
            Array.from(divs2).forEach(div => {
                  div.classList.add("played");
              });
          }, delay);
          //re-enables mouse presses after round is played
          setTimeout(enableMousePresses, 3750);
          //resets all choices to default state
          const delay2 = 3500;
          let timerId2;
          clearTimeout(timerId2);
          timerId = setTimeout(function() {
            //gets RPS value of choices, plays a round using those choices
            const playC = document.querySelector(".pChoice.played").getAttribute("value");
            const comC = document.querySelector(".cChoice.played").getAttribute("value");
            const delay3 = 700;
            let timerId3;
            clearTimeout(timerId3);
            timerId3 = setTimeout(console.log(playRound(playC,comC)), delay3);
            const divs = document.querySelectorAll(".played");
            divs.forEach((div) => {
                div.classList.remove("selected");
                div.classList.remove("played");
            });
          }, delay2);
    } else {
        //prompts user to make a selection if they haven't
        window.alert("Select a champion!");
    }
});