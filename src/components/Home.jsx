import { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { useGlobalState } from "../GlobalState";

function Home() {
  const [movieName, setMovieName] = useGlobalState("movieName");
  const [movieResults, setMovieResults] = useGlobalState("movieResults");
  const [actors, setActors] = useGlobalState("actors");
  const [selectedMovie, setSelectedMovie] = useGlobalState("selectedMovie");
  const [homepage, setHomepage] = useState("true");

  // SEARCH MOVIE NAME, RETURN MOVIE ID
  const getMovieID = () => {
    setHomepage(false);
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

  // SEARCH MOVIE ID, GET MOVIE CAST

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
        console.log(response.data.actors);
        setActors(response.data.actors);
        setSelectedMovie(response.data);
      })

      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    setMovieResults([]);
  }, []);
  return (
    <div className="flex flex-col justify-around items-center min-h-screen bg-gradient-to-tr from-violet-400 to-green-400">
      <button
        onClick={() => {
          setHomepage(true);
        }}
        className="font-bold text-4xl h-24"
      >
        IMDb Chain Game
      </button>

      {homepage && (
        <div className="flex justify-center">
          <section className="flex flex-col gap-y-8 justify-around items-center w-6/12 h-10/12">
            <div className="flex flex-col items-center justify-center gap-y-4 ">
              <h4 className="font-semibold text-lg text-center">
                How to Play: Start by searching a movie title, then select a
                movie. In the first round, you will have to type the name of an
                actor/actress in the movie. If you guess correctly, you will
                then enter the second round, in which you have to guess the name
                of a movie in which your previously selected actor/actress was
                also in. As you keep guessing correctly, the rounds keep
                alternating. Simple as that !
              </h4>
            </div>
            <div className="flex flex-col mb-32 w-6/12 gap-y-2">
              <input
                className="rounded p-1 text-center"
                type="text"
                placeholder="Search A Movie Name To Begin"
                onChange={(e) => setMovieName(e.target.value)}
              />
              <button
                className="px-2 py-1 rounded border-double border-2 border-red-500 hover:text-white hover:bg-red-500 hover:scale-110 tranformation duration-200"
                onClick={getMovieID}
              >
                Search Movies
              </button>
            </div>
          </section>
        </div>
      )}

      <div>
        <section className="flex flex-wrap justify-center items-baseline gap-y-6">
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
        </section>
      </div>
    </div>
  );
}

export default Home;
