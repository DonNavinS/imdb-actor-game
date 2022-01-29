import { useState } from "react";
import "./App.css";
import Axios from "axios";
function App() {
  const [movieName, setMovieName] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [actors, setActors] = useState([]);

  const getCast = () => {
    var options = {
      method: "GET",
      url: "https://data-imdb1.p.rapidapi.com/movie/id/tt0086250/cast/",
      headers: {
        "x-rapidapi-host": "data-imdb1.p.rapidapi.com",
        "x-rapidapi-key": "7bca20d701msh6e19f6d29e75ea8p1fda7bjsnb742d201c4e9",
      },
    };

    Axios.request(options)
      .then(function (response) {
        setActors(
          response.data.results.roles.filter(
            (item) => item.role !== "Director" && item.role !== "Writer"
          )
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getMovieID = () => {
    var options = {
      method: "GET",
      url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
      params: { s: movieName, r: "json", page: "1" },
      headers: {
        "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
        "x-rapidapi-key": "7bca20d701msh6e19f6d29e75ea8p1fda7bjsnb742d201c4e9",
      },
    };

    Axios.request(options)
      .then(function (response) {
        console.log(response.data.Search);
        setMovieResults(response.data.Search);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-tr from-violet-400 to-green-400 ">
      <div className="flex gap-x-4 -translate-y-1/2">
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
              <button>
                <img
                  width="150vw"
                  height="150vh"
                  src={item.Poster}
                  alt={`${item.Title} movie poster `}
                />
              </button>
              <p className="text-center">{item.Title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
