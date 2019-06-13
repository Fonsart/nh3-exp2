import React, { Component } from "react";
import { render } from "react-dom";
import "./styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./components/Game/Game";
import About from "./components/About/About";
import Home from "./components/HomePage/Home" ;
import Selfie from "./components/Game/Selfie" ;
import registerServiceWorker from "./registerServiceWorker";

export default class App extends Component {

  render() {

    // Dynamically determine the base path.
    const publicUrl = process.env.PUBLIC_URL
    const basename = publicUrl !== '' && publicUrl !== '/' ? new URL(publicUrl).pathname : '';

    return (
    <Router basename={basename}>
      <div id="App">
        <Route exact path={'/'} component={Home} />
        <Route exact path={'/about'} component={About} />
        <Route exact path={'/game'} component={Game} />
        <Route exact path={'/selfie'} component={Selfie} />
      </div>
    </Router>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
registerServiceWorker();
