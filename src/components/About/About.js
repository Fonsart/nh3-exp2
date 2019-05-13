/* eslint-disable */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./About.css";


class About extends Component {

    render() {
        return (
            <div className="fullBG blue-bg flex flex-col justify-between text-center">
                <nav className="relative"><Link to={`${process.env.PUBLIC_URL}/`} className="btn btn--close router-link-active"></Link></nav>
                <header>
                    <h1 className="normal-case text-2xl">Une expérience du Lab de notrehistoire.ch</h1>
                </header>

                <aside>
                    <h2>Conçu et développé par:</h2>
                    <p><a href="https://mei.heig-vd.ch/" target="_blank">Media Engineering Institute</a><br/><a href="https://heig-vd.ch" target="_blank">HEIG-VD</a></p>
                    <p>2019</p>
                </aside>

                <main>
                    <h2>Découvrez nos autres univers:</h2>
                    <ul className="nh3-univers">
                        <li><h2><a href="https://notrehistoire.ch" target="_blank">L'archive</a></h2></li>
                        <li><h2><a href="#" target="_blank">Le Mag</a></h2></li>
                        <li><h2><a href="#" target="_blank">Le Lab</a></h2></li>
                    </ul>
                </main>
                <footer><p>© Fonsart - 2019</p><p className="slogan">« Des histoires d’archives »</p></footer>
            </div >
        );
    }

}


export default About;