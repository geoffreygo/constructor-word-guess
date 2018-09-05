var Word = require("./word.js");
var inquire = require("inquirer");
var heroes = ["superman", "batman", "aquaman", "spiderman", "daredevil", "hellboy", "wolverine", "starlord", "deadpool", "robin", "hawkeye", "rorschach", "cyborg", "cyclops", "iceman", "colossus", "nightcrawler", "magneto", "gambit", "psylocke", "antman", "havok", "vision", "quicksilver", "powerman", "shehulk", "hawkman", "supergirl", "mystique", "punisher", "dazzler"]
var answerWord = new Word;
var guesses = 8;
var guessedLetters = 0;
var prevGuessed = 0;



function startGame() {
    guesses = 8;
    answerWord = new Word;
    answerWord.fillAnswer(heroes[Math.floor(Math.random() * heroes.length)]);
    guessedLetters = 0;
    prevGuessed = 0;
    guessLetter();
}

function guessLetter() {
    var wordStatus = answerWord.renderWord();
    console.log(wordStatus + "\n");
    inquire.prompt([
        {
            type: "input",
            name: "guess",
            message: "Guess a letter!"
        }
    ]).then(function(guess) {
        answerWord.checkWord(guess);
        wordStatus = answerWord.renderWord();
        console.log(answerWord);
        guessedLetters = 0;
        for (var i = 0; i < answerWord.answer.length; i++) {
            console.log("in for");
            if (answerWord.answer[i].isGuessed) {
                guessedLetters ++;
            }            
        } 
        console.log(guessedLetters, prevGuessed);
        if (guessedLetters > prevGuessed) {
            console.log(guessedLetters, prevGuessed);
            console.log("CORRECT!!!");
            prevGuessed = guessedLetters;
        } else {
            console.log("INCORRECT!!!")
            guesses--;
            console.log ("You have " + guesses + " guesses left!\n");
        }
        console.log(guessedLetters, prevGuessed);
        checkWin(wordStatus);    
    })
}

function checkWin(word) {
    var blanks = 0;
    word = word.split("");
    for (var i = 0; i < word.length; i++) {
        if (word[i] === "_") {
            blanks++;
        }
    };
    if (guesses <= 0) {
        console.log(word.join("") + "\n");
        console.log ("You lost!! Next word:\n");
        startGame();
    } else if (blanks > 0) {
        guessLetter();
    } else {
        console.log("You won!! Next word:\n");
        startGame();
    }
}

startGame();