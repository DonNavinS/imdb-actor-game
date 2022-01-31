import React, { useState } from "react";
import { useGlobalState } from "../GlobalState";
import Axios from "axios";

function Play() {
  const [selectedMovie, setSelectedMovie] = useGlobalState("selectedMovie");
  const [actors, setActors] = useGlobalState("actors");
  const [guess, setGuess] = useGlobalState("guess");
  const [guessResult, setGuessResult] = useState(null);
  const [actorID, setActorID] = useState("");
  const [movies, setMovies] = useState([]);
  const [actorImage, setActorImage] = useState("");
  const [actorName, setActorName] = useState("");
  const [movieRound, setMovieRound] = useState(true);

  const actorsNames = actors.map((item) => item.name);
  const movieNames = movies;

  const submitActorGuess = () => {
    if (actorsNames.includes(guess)) {
      const newGuessResult = actorsNames.includes(guess);
      setGuessResult(newGuessResult);
      setActorID(actors.filter((item) => item.name === guess)[0].id);
    } else {
      setGuessResult(false);
    }
  };

  const submitMovieGuess = () => {
    if (movieNames.includes(guess)) {
      setGuessResult(true);
    } else {
      setGuessResult(false);
    }
  };

  const correctGuess = () => {
    setGuessResult(null);
    setGuess("");
    setActorID("");
    setMovieRound(false);

    var optionsForID = {
      method: "GET",
      url: `https://data-imdb1.p.rapidapi.com/actor/id/${actorID}/all_roles/`,
      params: { page_size: "50" },
      headers: {
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        "x-rapidapi-key": "7bca20d701msh6e19f6d29e75ea8p1fda7bjsnb742d201c4e9",
      },
    };

    Axios.request(optionsForID)
      .then(function (response) {
        console.log(response.data.results.map((item) => item[0].title));
        setMovies(response.data.results.map((item) => item[0].title));
      })
      .catch(function (error) {
        console.error(error);
      });

    var optionsForActorInfo = {
      method: "GET",
      url: `https://data-imdb1.p.rapidapi.com/actor/id/${actorID}/`,
      headers: {
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        "x-rapidapi-key": "7bca20d701msh6e19f6d29e75ea8p1fda7bjsnb742d201c4e9",
      },
    };

    Axios.request(optionsForActorInfo)
      .then(function (response) {
        setActorImage(response.data.results.image_url);
        setActorName(response.data.results.name);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center">
        {movieRound ? (
          <div>
            <img
              className="w-48 h-64 rounded-lg"
              src={selectedMovie.image}
              alt={`${selectedMovie.title} poster`}
            />
            <p className="text-center">{selectedMovie.title}</p>
          </div>
        ) : (
          <div>
            <img
              className="w-48 h-64 rounded-lg"
              src={actorImage}
              alt={`${actorName} poster`}
            />
            <p className="text-center">{selectedMovie.title}</p>
          </div>
        )}

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
        {movieRound ? (
          <button onClick={submitActorGuess}>Guess</button>
        ) : (
          <button onClick={submitMovieGuess}>Guess</button>
        )}
      </div>
    </div>
  );
}

export default Play;
