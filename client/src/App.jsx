import { useState } from "react";
import "./App.css";
import Axios from "axios";
function App() {
  const [actors, setActors] = useState([]);

  const getData = () => {
    var options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/title/get-full-credits",
      params: { tconst: "tt0944947" },
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "7bca20d701msh6e19f6d29e75ea8p1fda7bjsnb742d201c4e9",
      },
    };

    Axios.request(options)
      .then(function (response) {
        const firstTen = response.data.cast.slice(0, 10);
        console.log(firstTen);
        setActors(firstTen);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={getData}>get</button>
      <div>
        {actors.map((item, index) => {
          return <p key={index}>{item.name}</p>;
        })}
      </div>
    </div>
  );
}

export default App;
