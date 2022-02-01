import React, { useState } from "react";
import { useGlobalState } from "../GlobalState";
import Axios from "axios";
import { Link } from "react-router-dom";

function Play() {
  const [selectedMovie, setSelectedMovie] = useGlobalState("selectedMovie");
  const [actors, setActors] = useGlobalState("actors");
  const [guess, setGuess] = useGlobalState("guess");
  const [guessResult, setGuessResult] = useState(null);
  const [actorID, setActorID] = useState("");
  const [movies, setMovies] = useState([]);
  const [movieIDs, setMovieIDs] = useState([]);
  const [actorImage, setActorImage] = useState("");
  const [actorName, setActorName] = useState("");
  const [movieRound, setMovieRound] = useState(true);
  const [correctMovieID, setCorrectMovieID] = useState("");

  const actorsNames = actors.map((item) => item.name);
  const movieNames = movies;

  const submitActorGuess = () => {
    if (actorsNames.includes(guess)) {
      setGuessResult(true);
      setActorID(actors.filter((item) => item.name === guess)[0].id);
      setGuess("");
    } else {
      setGuessResult(false);
    }
  };

  const submitMovieGuess = () => {
    if (movieNames.includes(guess)) {
      setGuessResult(true);
      const indexOfMovieID = movieNames.indexOf(
        movieNames.find((item) => item === guess)
      );
      setCorrectMovieID(movieIDs[indexOfMovieID]);
      setGuess("");
    } else {
      setGuessResult(false);
    }
  };

  const correctActorGuess = () => {
    setGuessResult(null);
    setActorID("");
    setMovieRound(false);

    // SEARCH ACTOR ID, GET LIST OF MOVIES

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
        console.log(response.data.results);
        setMovies(response.data.results.map((item) => item[0].title));
        setMovieIDs(response.data.results.map((item) => item[0].imdb_id));
      })
      .catch(function (error) {
        console.error(error);
      });

    //   SEARCH ACTOR ID, GET ACTOR NAME AND IMAGE
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

  //   SEARCH MOVIE ID, GET CAST, TITLE, IMAGE
  const correctMovieGuess = () => {
    setGuessResult(null);
    setMovieRound(true);

    var options = {
      method: "GET",
      url: "https://movie-details1.p.rapidapi.com/imdb_api/movie",
      params: { id: correctMovieID },
      headers: {
        "x-rapidapi-host": "movie-details1.p.rapidapi.com",
        "x-rapidapi-key": "7bca20d701msh6e19f6d29e75ea8p1fda7bjsnb742d201c4e9",
      },
    };

    Axios.request(options)
      .then(function (response) {
        console.log(response.data);
        setActors(response.data.actors);
        setSelectedMovie(response.data);
      })

      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen min-w-full  bg-gradient-to-tr from-violet-500 to-green-400 ">
      <Link to="/home" className="font-bold text-4xl h-24">
        IMDb Chain Game
      </Link>
      <section className="flex flex-col gap-y-4 items-center justify-center ">
        {movieRound ? (
          <div className="flex flex-col gap-y-2">
            <img
              className="w-64 h-96 rounded-lg"
              src={selectedMovie.image}
              alt={`${selectedMovie.title} poster`}
            />
            <p className="text-center text-2xl font-semibold">
              {selectedMovie.title}
            </p>
            <input
              className="border-2 border-black rounded p-1"
              placeholder="Enter Actor Name"
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-y-2">
            <img
              className="w-64 h-96 rounded-lg"
              src={actorImage}
              alt={`${actorName} poster`}
            />
            <p className="text-center text-2xl font-semibold">{actorName}</p>
            <input
              className="border-2 border-black rounded p-1"
              placeholder="Enter Actor Name"
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
            />
          </div>
        )}

        {guessResult !== null && movieRound ? (
          guessResult === true ? (
            <div className="flex flex-col items-center justify-around bg-green-500 inset-y-24 inset-x-56 rounded-3xl bg-opacity-90 absolute transition duration-300">
              <div className="font-bold text-4xl ">Correct</div>
              <button
                onClick={correctActorGuess}
                className="border-black border-2 rounded-lg p-2 hover:bg-green-700 hover:text-white hover:scale-110 transition duration-200"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-around bg-red-400 inset-y-24 inset-x-56 rounded-lg bg-opacity-90 absolute">
              <div className="font-bold text-4xl">Incorrect</div>
              <button
                onClick={() => setGuessResult(null)}
                className="border-black border-2 rounded-lg p-2 hover:bg-red-600 hover:text-white hover:scale-110 transition duration-200"
              >
                Try Again
              </button>
            </div>
          )
        ) : null}
        {guessResult !== null && !movieRound ? (
          guessResult === true ? (
            <div className="flex flex-col items-center justify-around bg-green-500 inset-y-24 inset-x-56 rounded-lg bg-opacity-90 absolute">
              <div className=" font-bold text-4xl">Correct</div>
              <button
                onClick={correctMovieGuess}
                className="border-black border-2 rounded-lg p-2 hover:bg-green-700 hover:text-white hover:scale-110 transition duration-200"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-around bg-red-400 inset-y-24 inset-x-56 rounded-lg bg-opacity-90 absolute">
              <div className="font-bold text-4xl">Incorrect</div>
              <button
                onClick={() => setGuessResult(null)}
                className="border-black border-2 rounded-lg p-2 hover:bg-red-600 hover:text-white hover:scale-110 transition duration-200"
              >
                Try Again
              </button>
            </div>
          )
        ) : null}
        {movieRound ? (
          <button
            className="px-2 py-1 rounded border-double border-2 border-red-500 hover:text-white hover:bg-red-500 hover:scale-110 tranformation duration-200"
            onClick={submitActorGuess}
          >
            Guess
          </button>
        ) : (
          <button
            className="px-2 py-1 rounded border-double border-2 border-red-500 hover:text-white hover:bg-red-500 hover:scale-110 tranformation duration-200"
            onClick={submitMovieGuess}
          >
            Guess
          </button>
        )}
      </section>
    </div>
  );
}

export default Play;
