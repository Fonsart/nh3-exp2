import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";


function Home() {
    return (
        <div className="fullBG blue-bg flex flex-col" id="home">
            <header className="mt-auto">
                <h1>PixPlorer</h1>
            </header>

            <aside className="flex mt-auto justify-center relative">
                <p>Débuter l'expérience</p>
            </aside>
            <aside>
                <p><Link to={`/game/`} className="btn btn__primary"><i className="fas fa-camera"></i></Link></p>
            </aside>

            <footer className="mt-auto">
                <Link to={`/about/`} className="btn">À propos</Link>
            </footer>
        </div >
    );
}


export default Home;