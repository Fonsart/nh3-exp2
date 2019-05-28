import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {
    isFirefox,
    isChrome,
    isIOS,
    browserName,
    osName
} from "react-device-detect";


class Home extends Component {

    constructor(props) {
        //eslint-disable-next-line
        const validBrowser = !((isIOS && isFirefox) || (isIOS && isChrome));

        super(props);
        this.state = {
            validBrowser: validBrowser
        }
    }
    render() {
        return (
            <div className="fullBG blue-bg flex flex-col" id="home" >
                <header className="mt-auto">
                    <h1>PixPlorer</h1>
                </header>

                {this.state.validBrowser ? (
                    <div>
                        <aside className="flex mt-auto justify-center relative">
                            <p>Débuter l'expérience</p>
                        </aside>
                        <aside>
                            <p><Link to={`/game/`} className="btn btn__primary"><i className="fas fa-camera"></i></Link></p>
                        </aside>
                    </div>
                ) : (
                        <div>
                            <aside className="flex mt-auto justify-center relative">
                                <p>Oups ! Il semblerait que vous utilisiez le navigateur {browserName} avec votre smartphone {osName}</p>
                            </aside>
                            <aside>
                                <p>Rendez-vous sur Safari pour profiter pleinement de cette expérience !</p>
                            </aside>
                        </div>
                    )}

                <footer className="mt-auto">
                    <Link to={`/about/`} className="btn">À Propos</Link>
                </footer>
            </div >
        );
    }
}


export default Home;