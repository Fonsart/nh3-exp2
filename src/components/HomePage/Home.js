import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./Home.css";


class Home extends Component {

    render() {
        return (
            <div className="fullBG flex flex-col" id="home">
                <header className="mt-auto">
                    <h1>PixPlorer</h1>
                </header>

                <main className="flex mt-auto justify-center relative">
                    <Link to={`/game/`} class="btn btn__primary">Explorer</Link>
                </main>

                <footer class="mt-auto">
                    <Link to={`/about/`} class="btn">À propos</Link>
                </footer>
            </div >
        );
    }

}


export default Home;