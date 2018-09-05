function Letter(letter) {
    this.letter = letter;
    this.isGuessed = false;
}

Letter.prototype.toString = function() {
    if (this.isGuessed) {
        return this.letter;
    } else {
        return "_ ";
    }
}

Letter.prototype.checkGuess = function(guess) {
    if (guess === this.letter) {
        this.isGuessed = true;
        return true;
    }
}

module.exports = Letter;