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
    <Router >
      <div basename={`${process.env.PUBLIC_URL}`} id="App">
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Home} />
        <Route exact path={`${process.env.PUBLIC_URL}/about`} component={About} />
        <Route exact path={`${process.env.PUBLIC_URL}/game`} component={Game} />
      </div>
    </Router>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
registerServiceWorker();
