import { useState } from 'react';

export default function GuessNumber() {

  let [randomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  let [previousGusses, setPreviousGuesses] = useState('');
  let [guess, setGuess] = useState('');
  let [remaining, setRemaining] = useState(10);
  let [text, setText] = useState('');
  let [gameOver, setGameOver] = useState(false);

  return (
    <div className="guess-number py-4">
      <div className="header">
        <h1 className="bg-success bg-gradient text-white fw-bold p-2">Number Guessing Game</h1>
        <h5 className="mb-3">Try and guess a random number between <b>1</b> and <b>100</b>.</h5>
        <h5>You have 10 attempts to guess the right number.</h5>
      </div>
      <div className="bg-info bg-gradient text-center py-4">
        <h2 className="">Guess a Number</h2>
        <div>
          <input
            type="text"
            className="p-2 mt-3 text-center fs-3 guess"
            onChange={e => { setGuess(e.target.value) }}
            value={guess}
            disabled={gameOver ? true : false}
          />
        </div>
        <button
          className="btn btn-warning fs-3 rounded-pill my-4"
          onClick={() => {
            if (remaining > 0) {
              if (isNaN(guess) === false && guess !== '') {
                if (Number(guess) === randomNumber) {
                  setText('Congratulations! You won!');
                  setGameOver(true);
                } else if (Number(guess) < randomNumber) {
                  setText('Too low! Try again!');
                  setRemaining(--remaining);
                  setPreviousGuesses(previousGusses += ' ' + guess);
                } else if (Number(guess) > randomNumber) {
                  setText('Too high! Try again!');
                  setRemaining(--remaining);
                  setPreviousGuesses(previousGusses += ' ' + guess);
                };
              } else {
                alert('Please enter a valid number!');
              };
            };

            if (remaining === 0) {
              setGameOver(true);
              setText('Game over! Number was ' + randomNumber);
            };

            setGuess('');
          }}
          disabled={gameOver ? true : false}
        >Submit guess</button>
        <h5 className="mb-3">Previous Guesses: {previousGusses}</h5>
        <h5>Guesses Remaining: {remaining}</h5>
        <h3 className={"bg-success bg-gradient p-2 text-white fw-bold my-3" + (text !== '' ? '' : ' d-none')}>{text}</h3>
        <button
          className={"btn btn-success fs-3 my-2 fw-bold w-100" + (gameOver ? '' : ' d-none')}
          onClick={() => { window.location.reload() }}
        >Start New Game</button>
      </div>
    </div>
  );
};