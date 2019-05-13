import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";


function Home(){
        return (
            <div className="fullBG blue-bg flex flex-col" id="home">
                <header className="mt-auto">
                    <h1>PixPlorer</h1>
                </header>

                <main className="flex mt-auto justify-center relative">
                    <Link to={`/game/`} className="btn btn__primary">Explorer</Link>
                </main>

                <footer className="mt-auto">
                    <Link to={`/about/`} className="btn">À propos</Link>
                </footer>
            </div >
        );
}


export default Home;