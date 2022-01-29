import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useGlobalState } from "../GlobalState";

function Home() {
  const [movieName, setMovieName] = useGlobalState("movieName");
  const [movieResults, setMovieResults] = useGlobalState("movieResults");
  const [actors, setActors] = useGlobalState("actors");
  const [selectedMovie, setSelectedMovie] = useGlobalState("selectedMovie");

  const getMovieID = () => {
    var options = {
      method: "GET",
      url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
      params: { s: movieName.trim(), r: "json", page: "1" },
      headers: {
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "7bca20d701msh6e19f6d29e75ea8p1fda7bjsnb742d201c4e9",
      },
    };

    Axios.request(options)
      .then(function (response) {
        // setMovieResults(response.data.Search);
        setMovieResults(
          response.data.Search.filter((item) => item.Poster !== "N/A")
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getCast = (item) => {
    var options = {
      method: "GET",
      url: "https://movie-details1.p.rapidapi.com/imdb_api/movie",
      params: { id: item.imdbID },
      headers: {
        "x-rapidapi-host": "movie-details1.p.rapidapi.com",
        "x-rapidapi-key": "7bca20d701msh6e19f6d29e75ea8p1fda7bjsnb742d201c4e9",
      },
    };

    Axios.request(options)
      .then(function (response) {
        console.log(response.data.actors.map((actor) => actor.name));
        setActors(response.data.actors.map((actor) => actor.name));
        setSelectedMovie(response.data);
      })

      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-tr from-violet-400 to-green-400 ">
      <div className="flex gap-x-4 -translate-y-1/2 ">
        <button
          className="px-2 py-1 rounded border-double border-2 border-red-600 hover:text-white hover:bg-red-600 hover:scale-110 tranformation duration-200"
          onClick={getMovieID}
        >
          Search Movies
        </button>

        <input
          className="rounded p-1"
          type="text"
          placeholder="Search Movie Name"
          onChange={(e) => setMovieName(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap justify-center items-baseline ">
        {movieResults.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col basis-1/5 justify-center items-center"
            >
              <Link to="/play">
                <button onClick={() => getCast(item)}>
                  <img
                    // width="150vw"
                    // height="150vh"
                    className="w-48 h-64 rounded-lg"
                    src={item.Poster}
                    alt={`${item.Title} movie poster `}
                  />
                </button>
              </Link>
              <p className="text-center">{item.Title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
