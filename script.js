let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
let guessArray = [];

function checkGuess(e) {
  e.preventDefault(); // Prevent form submission
  const userGuess = Number(guessField.value);

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    alert("Please enter a valid number between 1 and 100.");
    guessField.value = '';
    guessField.focus();
    return;
  }

  guessArray.push(userGuess);
  guesses.textContent = guessArray.join(', ');

  if (userGuess === randomNumber) {
    lowOrHi.textContent = 'Congratulations! You got it right!';
    lowOrHi.style.color = 'lightgreen';
    gameOver();
  } else if (guessCount === 10) {
    lowOrHi.textContent = `!!!GAME OVER!!! The number was ${randomNumber}`;
    lowOrHi.style.color = 'red';
    gameOver();
  } else {
    lowOrHi.textContent = userGuess < randomNumber ? 'Too low!' : 'Too high!';
    lowOrHi.style.color = 'orange';
  }

  guessCount++;
  lastResult.textContent = 10 - guessArray.length;
  guessField.value = '';
  guessField.focus();
}

function gameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start New Game';
  document.querySelector('#wrapper').appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}

function resetGame() {
  guessCount = 1;
  guessArray = [];
  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guesses.textContent = '';
  lastResult.textContent = '10';
  lowOrHi.textContent = '';
  lowOrHi.style.color = '#fff';
  resetButton.remove();
  randomNumber = Math.floor(Math.random() * 100) + 1;
}

guessSubmit.addEventListener('click', checkGuess);
