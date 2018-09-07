// Letter constructor
function Letter(letter) {
    // the letter
    this.letter = letter;
    // boolean to store if the letter has been guessed or not
    this.isGuessed = false;
}

// Function to return the letter if it is guessed, or an underline otherwise
Letter.prototype.toString = function() {
    if (this.isGuessed) {
        return this.letter;
    } else {
        return "_ ";
    }
}

// Function that takes a letter as an argument and check if it matches the letter in the constructor
Letter.prototype.checkGuess = function(guess) {
    if (guess === this.letter) {
        this.isGuessed = true;
        return true;
    }
}

module.exports = Letter;