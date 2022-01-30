import React, { useState } from "react";
import { useGlobalState } from "../GlobalState";
import Axios from "axios";

function Play() {
  const [actors, setActors] = useGlobalState("actors");
  const [actorID, setActorID] = useState("");
  const [selectedMovie, setSelectedMovie] = useGlobalState("selectedMovie");
  const [guess, setGuess] = useGlobalState("guess");
  const [guessResult, setGuessResult] = useState(null);
  const [movies, setMovies] = useState([]);

  const actorsNames = actors.map((item) => item.name);

  const submitGuess = () => {
    if (actorsNames.includes(guess)) {
      const newGuessResult = actorsNames.includes(guess);
      setGuessResult(newGuessResult);
      setActorID(actors.filter((item) => item.name === guess)[0].id);
    }
  };

  const correctGuess = () => {
    setGuessResult(null);
    setGuess("");
    setActorID("");

    var options = {
      method: "GET",
      url: `https://data-imdb1.p.rapidapi.com/actor/id/${actorID}/all_roles/`,
      params: { page_size: "50" },
      headers: {
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        "x-rapidapi-key": "7bca20d701msh6e19f6d29e75ea8p1fda7bjsnb742d201c4e9",
      },
    };

    Axios.request(options)
      .then(function (response) {
        console.log(response.data.results.map((item) => item[0].title));
        setMovies(response.data.results.map((item) => item[0].title));
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  console.log(movies);
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
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        {guessResult !== null ? (
          guessResult === true ? (
            <div className="flex flex-col items-center justify-center bg-green-400 inset-y-36 inset-x-56 rounded-lg bg-opacity-90 absolute">
              <div className=" ">Correct</div>
              <button onClick={correctGuess} className="">
                Continue
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center bg-red-400 inset-y-36 inset-x-56 rounded-lg bg-opacity-90 absolute">
              <div className="">Incorrect</div>
              <button onClick={() => setGuessResult(null)} className="">
                Try Again
              </button>
            </div>
          )
        ) : null}
        <button onClick={submitGuess}>Guess</button>
      </div>
    </div>
  );
}

export default Play;
