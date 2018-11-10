// Create the variables for wins and losses.
var wins = 0;
var losses = 0;

// Create the variable for maximum amount of errors before it becomes a loss.
var maxErrors = 15;

// Create variables for anything that will have to change something in the HTML when something happens in the game.
var wordDisplayLettersElement = document.getElementById("nationalPark");
var guessedLettersElement = document.getElementById("letters");
var errorCountElement = document.getElementById("guesses");
var winCountElement = document.getElementById("wins");
var lossCountElement = document.getElementById("losses");

// Create a variable for an array of all the valid guesses. This way, a user can't press a random key and have it captured as an incorrect guess.
var validGuesses = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var game = new Hangman();

document.onkeyup = function(event) {
    var userGuess = event.key;
    // If the game is NOT over:
    if (!game.gameOver) {
        // This checks to see if the user's guess is a valid guess AND if the user guess is not aready a guessed letter... and if that is the case, then it checks the guess to see if it matches the word from the game. 
        if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
            game.checkGuess(userGuess);
        }
    // If the game IS over:
    } else {
        game = new Hangman();
        game.updatePageData();
    }
};

// Create a function for what happens to begin a new hangman game.
function Hangman() {

    // Create an array for the park list. 'this' refers to the "Hangman" game. 
    this.parkList = [
        "yosemite", "yellowstone", "acadia", "sequoia", "zion", "arches", "glacier", "badlands", "olympic", "shenandoah", "denali", "canyonlands", "redwood", "everglades", "voyageurs"
    ]

    // Select a random word from the parkList array and make it equal to this.park to designate specifically which random park it chose for the round of the game.
    this.park = this.parkList[Math.floor(Math.random() * this.parkList.length)];
    this.guessedLetters = [];
    this.errors = 0;
    this.visibleLetters = [];
    this.gameOver = false;
    
    for (var i = 0; i < this.park.length; i++){
        this.visibleLetters[i] = (false);
    }
}

// This creates a function that takes the guessed letter from the user, checks to see if the letter is in this.park (randomly chosen word) and if it is, then it makes that letter a visible character. 
Hangman.prototype.checkGuess = function(char) {
    // Push the user guess into the html where "letters guessed already" is
    this.guessedLetters.push(char);

    // Create a variable to help us determine if the user guess is in the word.
    var isInWord = false;
    // Make a loop to check if the letter matches the first character in the random word, then the next, then the next, then the next...
    for (var i = 0; i <this.park.length; i++) {
        if (this.park.charAt(i) === char) {
            isInWord === true;
            this.visibleLetters[i] = true;
        }
    }

    // If the user's guess is not in the word, then it adds an error. 
    if (!isInWord) {
        this.errors++;
    }

    // If we get to the point where our total errors are greater than or equal to our maximum errors..
    if (this.errors >= maxErrors) {
        // We add a loss
        losses++;
        // The game is over
        this.gameOver = true;
    }

    // If all the visible letters are showing...
    if (!this.visibleLetters.includes(false)) {
        // We add a loss
        wins++;
        // The game is over
        this.gameOver = true;
    }

    // This updates the data on the page as all the functions are continuously running to keep the user up to date.
    game.updatePageData();
};


Hangman.prototype.updatePageData = function() {
    // Create a variable to grab the temporary string (for each round, this changes)
    var tempString = "";
    // Create a for loop that goes through the length of the visible characters. This takes the characters and makes them uppercase and then makes them into the charater "_"
    for (var i = 0; i <this.visibleLetters.length; i++) {
        tempString += ((this.visibleLetters[i] || this.gameOver) ? this.park.charAt(i).toUpperCase() : "_");
        if (i < (this.visibleLetters.length - 1)) tempString += " ";
    }
    // This puts the above into the HTML we defined with the variable wordDisplayLettersElement
    wordDisplayLettersElement.textContent = tempString;

    // The following code is to grab all of the guessed letters and apply them to the HTML
    tempString = "";
    for (var i = 0; i < this.guessedLetters.length; i++) {
        tempString += (this.guessedLetters[i].toUpperCase());
        if (i < (this.guessedLetters.length - 1)) tempString += " ";
    }
    for (var i = tempString.length; i < 51; i++){
        tempString += " ";
    }
    guessedLettersElement.textContent = tempString;

    // The following code grabs the errors and applies them to the HTML
    tempString = this.errors + " / " + maxErrors;
    for (var i = tempString.length; i < 32; i++) {
        tempString += " ";
    }
    errorCountElement.textContent = tempString;

    // The following code grabs the amount of wins and applies them to the HTML
    tempString = wins + "";
    for (var i = tempString.length; i < 45; i++) {
        tempString += " ";
    }
    winCountElement.textContent = tempString;

    // The following code grabs teh amount of losses and applies them to the HTML
    tempString = losses + "";
    for (var i = tempString.length; i < 43; i++) {
        tempString += " ";
    }
    lossCountElement.textContent = tempString;
}

game.updatePageData();