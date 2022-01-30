import React, { useState } from "react";
import { useGlobalState } from "../GlobalState";

function Play() {
  const [actors, setActors] = useGlobalState("actors");
  const [selectedMovie, setSelectedMovie] = useGlobalState("selectedMovie");
  const [guess, setGuess] = useGlobalState("guess");
  const [guessResult, setGuessResult] = useState(null);

  const submitGuess = () => {
    const newGuessResult = actors.includes(guess);
    setGuessResult(newGuessResult);
    console.log(newGuessResult);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        <img
          className="w-48 h-64 rounded-lg"
          src={selectedMovie.image}
          alt={`${selectedMovie.title} poster`}
        />
        <p className="text-center">{selectedMovie.title}</p>
        <input
          className="border-2 border-black rounded p-1"
          placeholder="Enter Actor Name"
          type="text"
          onChange={(e) => setGuess(e.target.value)}
        />

        {guessResult !== null ? (
          guessResult === true ? (
            <div className="flex flex-col items-center justify-center bg-green-400 inset-y-36 inset-x-56 rounded-lg bg-opacity-90 absolute">
              <div className=" ">Correct</div>
              <button onClick={() => setGuessResult(null)} className="">
                Continue
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-red-400 inset-y-36 inset-x-56 rounded-lg bg-opacity-90 absolute">
              <div className=" ">Incorrect</div>
              <button onClick={() => setGuessResult(null)} className="">
                Try Again
              </button>
            </div>
          )
        ) : null}
        <p>{guess}</p>
        <button onClick={submitGuess}>Guess</button>
      </div>
    </div>
  );
}

export default Play;
