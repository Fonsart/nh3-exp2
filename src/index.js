import React, { Component } from "react";
import { render } from "react-dom";
import "./styles.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Game from "./components/Game/Game"

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {

  }

  render() {
    return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Route path="/game" component={Game} />
      </div>
    </Router>
    );
  }
}

function Home(){
  return(
    <div>
        <div id="intro">
        <h1>Welcome</h1>
        </div>
        <Link to={`/game/`}>explorer</Link>
      </div >
  ); 
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
