// Import the Letter constructor
var Letter = require("./letter");

// Word constructor to be composed of Letter instances
function Word() {
    // Array to keep Letter objects
    this.answer = [];
        
}

// Function to take chosen word's letters and create Letter instances, then put all the Letters in the Word
Word.prototype.fillAnswer = function(word) {
    word.split("").forEach(element => {
    this.answer.push(new Letter(element));
    })
}

// Function to return the Word as a string
Word.prototype.renderWord = function() {
    var dispWord = "";
    this.answer.forEach(element => {
        dispWord += element.toString();
    })
    return dispWord;
}


// Function to take in a letter and check each Letter instance to see if there are matches
Word.prototype.checkWord = function(letter) {
    var result = false;
    this.answer.forEach(element => {
        element.checkGuess(letter.guess);
        if (element.checkGuess(letter.guess)) {
            result = true;
        }
        // console.log(result);
        return result;
    })
}

module.exports = Word;
