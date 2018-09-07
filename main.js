// Requires
var Word = require("./word.js");
var inquire = require("inquirer");
// Array of possible words
var heroes = ["superman", "batman", "aquaman", "spiderman", "daredevil", "hellboy", "wolverine", "starlord", "deadpool", "robin", "hawkeye", "rorschach", "cyborg", "cyclops", "iceman", "colossus", "nightcrawler", "magneto", "gambit", "psylocke", "antman", "havok", "vision", "quicksilver", "powerman", "shehulk", "hawkman", "supergirl", "mystique", "punisher", "dazzler"]
// New instance of Word constructor
var answerWord = new Word;
// Initial number of guesses
var guesses = 8;
// variable to keep number of letters in Word where 'isGuessed' is true
var numGuessedLetters = 0;
// variable to keep number of letters where 'isGuessed' was true before current guess
var prevGuessed = 0;
// Array to keep guessed letters for each game in
var guessedLetters = [];


// Re-initialize variables when restarting game; fill Word instance with random word from array
function startGame() {
    guesses = 8;
    answerWord = new Word;
    answerWord.fillAnswer(heroes[Math.floor(Math.random() * heroes.length)]);
    numGuessedLetters = 0;
    prevGuessed = 0;
    guessedLetters = [];
    // call guessLetter
    guessLetter();
}

// Function to take in guessed letter from user, see if it's in the word, and update the screen
function guessLetter() {
    // call renderWord() to print out the letters/underlines on the screen
    var wordStatus = answerWord.renderWord();
    console.log("\x1b[37m", wordStatus + "\n");
    // get letter from user
    inquire.prompt([
        {
            type: "input",
            name: "guess",
            message: "Guess a letter!"
        }
    ]).then(function(guess) {
        // For loop to check if letter has already been guessed. If it has, restart guessLetter()
        for (var i = 0; i < guessedLetters.length; i++) {
            if (guessedLetters[i] === guess.guess) {
                console.log("\x1b[37m", "You already tried that letter, guess another!");
                return guessLetter();
            }
        }
        // If the letter has not been previously guessed, push it to the array of guessed letters
        guessedLetters.push(guess.guess);
        // Call checkWord with the currently guessed letter as the argument
        answerWord.checkWord(guess);
        // store the rendered word (letters as string and underlines) in a variable
        wordStatus = answerWord.renderWord();
        // set numGuessedLetters to 0 so that it does not recount already counted letters
        numGuessedLetters = 0;
        // For loop to count number of guessed letters (isGuessed is true)
        for (var i = 0; i < answerWord.answer.length; i++) {
            if (answerWord.answer[i].isGuessed) {
                numGuessedLetters ++;
            }            
        } 
        // If the guessed letters is a higher number than it was last letter, the user guessed a correct letter
        if (numGuessedLetters > prevGuessed) {
            console.log("\x1b[32m", "CORRECT!!!\n");
            // Set previously guessed letters variable to number of guessed letters for next round
            prevGuessed = numGuessedLetters;
        // If the guessed letters is not hight, the user's guess was not correct
        } else {
            console.log("\x1b[31m", "INCORRECT!!!\n")
            // decrement the number of guesses they have left
            guesses--;
            console.log ("\x1b[37m", "You have " + guesses + " guesses left!\n");
        }
        // call checkWin to see if the user has won yet, sending string of word as an argument
        checkWin(wordStatus);    
    })
}

// Function to determine if the user has won, lost, or the game needs to continue
function checkWin(word) {
    // variable will be used to count the underlines (blanks) in the word
    var blanks = 0;
    // place the string values of the word in an array
    word = word.split("");
    // For loop to count the number of underlines
    for (var i = 0; i < word.length; i++) {
        if (word[i] === "_") {
            blanks++;
        }
    };
    // If the guesses have run out, tell user s/he has lost and restart game
    if (guesses <= 0) {
        console.log("\x1b[37m", word.join("") + "\n");
        console.log ("\x1b[37m", "You lost!! Next word:\n");
        startGame();
    // else if there are still underlines in the word (unguessed letters), continue game
    } else if (blanks > 0) {
        guessLetter();
    // The only possibility left is that the user has won!! Let user know, then restart game
    } else {
        console.log("\x1b[37m", "You won!! Next word:\n");
        startGame();
    }
}

// initial start of the game
startGame();