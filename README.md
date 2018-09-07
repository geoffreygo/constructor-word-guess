# constructor-word-guess

This is a word guess game utilizing node, constructors, npm modules, and module exports.

When the game starts, a random word is chosen from an array. The word's letters are each created as instances of
a Letter constructor, which are then pushed into the answer property (an array) of a Word instance.

The Letter constructor is comprised of:
  - letter - to hold the letter
  - isGuessed - to keep track of whether the letter has been guessed by the user or not
  - toString - a method that returns the letter or an underline, depending on isGuessed
  - checkGuess - a method that takes a letter as an argument and checks to see if it matches the letter in the Letter instance

The Word constructor is comprised of:
  - answer - an array to hold the Letter instances that comprise the word
  - fillAnswer - a method that takes the random word, creates Letter instances for each letter in it, and pushes them into answer
  - renderWord - a method that runs the toString method for each Letter and returns a string comprised of letters and underlines
  - checkWord - a method that takes the user's guess and checks it for each Letter by calling the checkGuess method for each

The game tells you if each guess is correct or incorrect, how many guesses you have left if incorrect, and warns you if you try to
guess a letter that you have already guessed for the current word. When you win or lose, the game automatically restarts.
