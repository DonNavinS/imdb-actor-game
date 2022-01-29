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
    <div>
      <button onClick={getMovieID}>get</button>
      <input
        type="text"
        placeholder="Search Movie Name"
        onChange={(e) => setMovieName(e.target.value)}
      />
      <div>
        {movieResults.map((item, index) => {
          return <div key={index}>{item.Title}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
