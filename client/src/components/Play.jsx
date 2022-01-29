import React, { useEffect } from "react";
import { useGlobalState } from "../GlobalState";

function Play() {
  const [actors, setActors] = useGlobalState("actors");
  const [selectedMovie, setSelectedMovie] = useGlobalState("selectedMovie");
  const [guess, setGuess] = useGlobalState("guess");

  const submitGuess = () => {
    console.log(actors.includes(guess));
  };

  useEffect(() => {
    setActors(selectedMovie.actors.map((item) => item.name));
    console.log(selectedMovie);
  }, [selectedMovie]);
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
          onChange={(e) => {
            setGuess(e.target.value);
          }}
        />
        <button onClick={submitGuess}>Guess</button>
      </div>
    </div>
  );
}

export default Play;
