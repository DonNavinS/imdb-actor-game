import { createGlobalState } from "react-hooks-global-state";

const { useGlobalState } = createGlobalState({
  movieName: "",
  movieResults: [],
  actors: [],
  selectedMovie: [],
  guess: "",
  guessResult: true,
});

export { useGlobalState };
