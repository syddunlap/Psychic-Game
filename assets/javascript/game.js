var wins = 0;
var losses = 0;

var maxErrors = 15;

var wordDisplayLettersElement = document.getElementById("nationalPark");
var guessedLettersElement = document.getElementById("letters");
var errorCountElement = document.getElementById("guesses");
var winCountElement = document.getElementById("wins");
var lossCountElement = document.getElementById("losses");

var validGuesses = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

var pressAnyKeyToStart = ["Press any key to start"];
var pressAnyKeyToReset = ["Press any key to reset"];
var youWin = ["You Win!"];
var youLose = ["You Lose!"];
var emptyAlert = [""];

var game = new Hangman();

document.onkeyup = function(event) {
    var userGuess = event.key;

    if (!game.gameOver) {
        if (validGuesses.includes(userGuess) && !game.guessedLetters.includes(userGuess)) {
            game.checkGuess(userGuess);
        }
    } else {
        game = new Hangman();
        game.updatePageData();
    }
};

function Hangman() {
    this.parkList = [
        "yosemite", "yellowstone", "acadia", "sequoia", "zion", "arches", "glacier", "badlands", "olympic", "shenandoah", "denali", "canyonlands", "redwood", "everglades", "voyageurs"
    ]

    this.park = this.parkList[Math.floor(Math.random() * this.parkList.length)];
    this.guessedLetters = [];
    this.errors = 0;
    this.visibleLetters = [];
    this.gameOver = false;
    this.alertLines = emptyAlert;
    for (var i = 0; i < this.park.length; i++){
        this.visibleLetters[i] = (false);
    }
}

Hangman.prototype.checkGuess = function(char) {
    this.guessedLetters.push(char);

    var isInWord = false;
    for (var i = 0; i <this.park.length; i++) {
        if (this.park.charAt(i) === char) {
            isInWord === true;
            this.visibleLetters[i] = true;
        }
    }
    if (!isInWord) {
        this.errors++;
    }

    if (this.errors >= maxErrors) {
        losses++;
        this.alertLines = youLose;
        this.gameOver = true;
    }

    if (!this.visibleLetters.includes(false)) {
        wins++;
        this.alertLines = youWin;
        this.gameOver = true;
    }

    game.updatePageData();
};

Hangman.prototype.updatePageData = function() {
    var tempString = "";
    for (var i = 0; i <this.visibleLetters.length; i++) {
        tempString += ((this.visibleLetters[i] || this.gameOver) ? this.park.charAt(i).toUpperCase() : "_");
        if (i < (this.visibleLetters.length - 1)) tempString += " ";
    }
    wordDisplayLettersElement.textContent = tempString;

    tempString = "";
    for (var i = 0; i < this.guessedLetters.length; i++) {
        tempString += (this.guessedLetters[i].toUpperCase());
        if (i < (this.guessedLetters.length - 1)) tempString += " ";
    }
    for (var i = tempString.length; i < 51; i++){
        tempString += " ";
    }
    guessedLettersElement.textContent = tempString;

    tempString = this.errors + " / " + maxErrors;
    for (var i = tempString.length; i < 32; i++) {
        tempString += " ";
    }
    errorCountElement.textContent = tempString;

    tempString = wins + "";
    for (var i = tempString.length; i < 45; i++) {
        tempString += " ";
    }
    winCountElement.textContent = tempString;

    tempString = losses + "";
    for (var i = tempString.length; i < 43; i++) {
        tempString += " ";
    }
    lossCountElement.textContent = tempString;

    for (var i = 0; i < blinkElements.length; i++) {
		blinkElements[i].textContent = (this.gameOver ? pressAnyKeyToReset[i] : pressAnyKeyToStart[i]);
	}

	for (var i = 0; i < alertLineElements.length; i++) {
		alertLineElements[i].textContent = (this.alertLines[i]);
	}
}

game.updatePageData();