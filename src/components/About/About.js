/* eslint-disable */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./About.css";


class About extends Component {
/**
 * To insert after <header>
 * <aside>
                    <h2>
                        <a href="https://lab.notrehistoire.ch" target="_blank">Tester nos autres expériences</a>
                    </h2>
                </aside>
 <main>
                    <h2>Nos autres univers:</h2>
                    <ul className="nh3-univers">
                        <li><a href="https://notrehistoire.ch" target="_blank">
                            <img  alt="L'archive" src={process.env.PUBLIC_URL+"/img/logos/logo_notrehistoire.svg"}></img>
                        </a></li>
                        <li><a href="https://mag.notrehistoire.ch" target="_blank">
                            <img alt="L'inédit" src={process.env.PUBLIC_URL+"/img/logos/Nameplate-L-Inedit.svg"}></img>
                        </a></li>
                    </ul>
                </main>
 */
    render() {
        return (
            <div className="fullBG blue-bg flex flex-col justify-between text-center">
                <nav className="relative"><Link to={'/'} className="btn btn--close router-link-active"></Link></nav>

                <header>
                    <h1 className="normal-case text-2xl">Une expérience du Lab de notrehistoire.ch</h1>
                </header>

                <aside>
                    <h3>Conçu et développé par:</h3>
                    <p><a href="https://mei.heig-vd.ch/" target="_blank">Media Engineering Institute</a></p><p><a href="https://heig-vd.ch" target="_blank">HEIG-VD</a></p>
                </aside>

                <footer><p>© Fonsart - 2019</p><p className="slogan">« Quand les Romands font leur histoire »</p></footer>
            </div >
        );
    }

}


export default About;
