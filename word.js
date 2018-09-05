var Letter = require("./letter");

function Word() {
    this.answer = [];
        
}

Word.prototype.fillAnswer = function(word) {
    word.split("").forEach(element => {
    this.answer.push(new Letter(element));
    })
}

Word.prototype.renderWord = function() {
    var dispWord = "";
    this.answer.forEach(element => {
        dispWord += element.toString();
    })
    return dispWord;
}

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
