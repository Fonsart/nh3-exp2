import React, { Component } from "react";
import { render } from "react-dom";
import "./styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Game from "./components/Game/Game";
import About from "./components/About/About";
import Home from "./components/HomePage/Home" ;
import Selfie from "./components/Game/Selfie" ;
import ImageDescription from "./components/Game/ImageDescription/ImageDescription" ;
import registerServiceWorker from "./registerServiceWorker";
import { CSSTransition } from 'react-transition-group'

const routes = [
  { path: '/', name: 'Home', Component: Home },
  { path: '/about', name: 'About', Component: About },
  { path: '/game', name: 'Game', Component: Game },
  { path: '/selfie', name: 'Selfie', Component: Selfie },
  { path: '/image', name: 'ImageDescription', Component: ImageDescription },
]

export default class App extends Component {


  render() {

    // Dynamically determine the base path.
    const publicUrl = process.env.PUBLIC_URL
    const basename = publicUrl !== '' && publicUrl !== '/' ? new URL(publicUrl).pathname : '';

    return (
      <Router basename={basename}>
        <div id="App">
          {routes.map(({ path, Component }) => (
            <Route key={path} exact path={path}>
              {({ match }) => (
                <CSSTransition
                  in={match != null}
                  timeout={300}
                  classNames="page"
                  unmountOnExit
                >
                  <div className="page">
                    <Component />
                  </div>
                </CSSTransition>
              )}
            </Route>
          ))}
        </div>
      </Router>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
registerServiceWorker();
