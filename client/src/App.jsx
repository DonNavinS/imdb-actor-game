import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./components/Home.jsx";
import Play from "./components/Play.jsx";

function App() {
  return (
    <Router>
      <Redirect to="/home" />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/play" component={Play} />
      </Switch>
    </Router>
  );
}

export default App;
