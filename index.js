var Word = require("./word.js");
var inquirer = require("inquirer");

//globals
var letters = "abcdefghijklmnopqrstuvwxyz"; // letters array to compare
var newGame = false;                        //flag for coninue palying or exit affter game end
var incorrectLetters = [];                  // holds the incorrect letter
var correctLetters = [];                    // holds the correct letter

// bands to guess
var bands_array = ["metallica", "mew", "stone temple pilots", "red hot chilli pepers", "rem", "green day", "peral jam"];

// Random word from bands_array 
var randomBand = bands_array[Math.floor(Math.random() * bands_array.length)];

// Word constructor
var computerWord = new Word(randomBand);

// Guesses left
var guessesLeft = 10;

function game() {
  // word constrcutor for new game
  if (newGame) {
    var randomBand = bands_array[Math.floor(Math.random() * bands_array.length)];
    computerWord = new Word(randomBand);
    newGame = false;
  }

  var wordComplete = [];
  computerWord.objArray.forEach(completeCheck);

  if (wordComplete.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter a letter between a-z!",
          name: "userLetter"
        }
      ])
      .then(function (input) {
        var userLetter = input.userLetter;
        
        if (!letters.includes(userLetter) || userLetter.length > 1) {
          console.log("\nYour input must be a single letter or a letter between a-z\n");
          game();
        } else {
          if (incorrectLetters.includes(userLetter) || correctLetters.includes(userLetter) || userLetter === "") {
            console.log("\nAlready Guessed or empty entry\n");
            game();
          } else {
            
            var wordCheckArray = [];
            computerWord.userGuess(userLetter);
            // Checks if guess is correct
            computerWord.objArray.forEach(wordCheck);
            if (wordCheckArray.join("") === wordComplete.join("")) {
              console.log("\nIncorrect\n");
              incorrectLetters.push(userLetter);
              guessesLeft--;
            } else {
              console.log("\nCorrect!\n");
              correctLetters.push(userLetter);
            }
            computerWord.print();
            //print info
            console.log("Guesses Left: " + guessesLeft + "\n");
            console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");
            if (guessesLeft > 0) {
              game();
            } else {
              console.log("You lose!\n");
              resetGame();
            }

            function wordCheck(key) {
              wordCheckArray.push(key.guessed);
            }
          }
        }
      });
  } else {
    console.log("YOU WIN!\n");
    resetGame();
  }

  function completeCheck(key) {
    wordComplete.push(key.guessed);
  }
}

function resetGame() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to:",
        choices: ["Play Again", "Exit"],
        name: "restart"
      }
    ])
    .then(function (input) {
      if (input.restart === "Play Again") {
        //reset the arrays
        incorrectLetters = [];
        correctLetters = [];
        guessesLeft = 10;
        //set game flag to true
        newGame = true;
        //call the game again
        game();
      } else {
        //to exit
        return;
      }
    });
}

game();