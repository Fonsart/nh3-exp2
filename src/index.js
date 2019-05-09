import React, { Component } from "react";
import { render } from "react-dom";
import "./styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./components/Game/Game"
import About from "./components/About/About" 
import Home from "./components/HomePage/Home" 

import registerServiceWorker from "./registerServiceWorker";

export default class App extends Component {
  componentWillMount() {

  }

  render() {
    return (
    <Router>
      <div id="App">
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route path="/game" component={Game} />
      </div>
    </Router>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
registerServiceWorker();
