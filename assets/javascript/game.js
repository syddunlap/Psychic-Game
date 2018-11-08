// Create an array of the National Parks to be used as the source of the secret word. Save this array in the variable nationalParks
var nationalPark = ["Yosemite", "Yellowstone", "Acadia", "Sequoia", "Zion", "Arches", "Glacier", "Badlands", "Olympic", "Shenandoah", "Denali", "Canyonlands", "Redwood", "Everglades", "Voyageurs"];

const guesses = 10; // Max number of tries the player has

var guessedLetters = []; // Stores the letters the user guessed
var currentWordIndex; // Index of the current word in the array
var guessingWord = []; // This will be the wored we actually build to match
var remainingGuesses = 0; // How many tries the player has left
var gameStarted = false; // Flag to tell if the game has started
var hasFinished = false; // Flag for 'press any key to try again'
var wins = 0; // How many wins the player has racked up.

// Reset our game-level variables. Creating a function that sets up all the variables for the start of the game.
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    // Use Math,floor to round the random number down to the nearest whole
    currentWordIndex = Math.floor(Math.random() * (nationalPark.length));

    //Clear out arrays
    guessedLetters = [];
    guessingWord = [];

    //Build the guessing word and clear it out
    for (var i = 0; i < nationalPark[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
};

// Updates the display on the HTML Page
function updateDisplay() {
    document.getElementById("wins").innerText = wins;
    document.getElementById("nationalPark").innerText = "";
    for (var i=0; i < nationalPark.length; i++) {
        document.getElementById("nationalPark").innerText += nationalPark[i];
    }
    document.getElementById("guesses").innerText = remainingGuesses;
    document.getElementById("letters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        hasFinished === true;
        alert("You lose! Try again!");
    }
};

// Capture the key presses 
document.onkeydown = function(event) {
    // If the game is over, use it as a reset
    if(hasFinished) {
        resetGame();
        hasFinished = false;
    }
    // Make sure a letter was pressed, not just any key.
    else  {
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

// We only want this to happen for actual letters. This also makes it so that if the user guesses the same letter twice it won't make a difference in their remaining guesses.
function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

    updateDisplay();
    checkWin();
};

// This function takes a letter and finds all instances of appearance in the string and replaces them in the guess word.
function evaluateGuess(letter) {
    var positions = [];
    //Loop through word finding all instances of guessed letter, store the indices in an array.
    for (var i = 0; i < nationalPark[currentWordIndex].length; i++){
        if(nationalPark[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    } 

    // if there are no indices, remove a guess
    if (positions.length <= 0) {
        remainingGuesses--;
    }
    else {
        // Loop through all the indices and replace the '_' with a letter.
        for (var i = 0; i < positions.length; i++) {
            nationalPark[positions[i]] = letter;
        }
    }
};

//Finally, check for a win
function checkWin() {
    if (guessingWord.indexOf("_") === -1) {
        wins++;
        hasFinished = true;
    }
};

