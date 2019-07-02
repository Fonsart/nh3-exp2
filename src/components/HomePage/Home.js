import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import {
    isFirefox,
    isChrome,
    isIOS,
    isMobile,
    browserName,
    osName
} from "react-device-detect";


class Home extends Component {

    render() {
        return (
            <div className="fullBG blue-bg flex flex-col" id="home" >
                <header className="mt-auto">
                    <h1>PixPlorer</h1>
                </header>

                {!((isIOS && isFirefox) || (isIOS && isChrome)) && isMobile ? (
                    <div>
                        <aside className="flex mt-auto justify-center relative">
                            <p>Commencer</p>
                        </aside>
                        <aside>
                            <p><Link to={`/selfie/`} className="btn btn__primary"><i className="fas fa-camera"></i></Link></p>
                        </aside>
                    </div>
                ) : !isMobile ? (<div>
                                    <aside className="flex mt-auto justify-center relative">
                                        <p>Cette webapp est destinée aux smartphones</p>
                                    </aside>
                                </div>) : (
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
                    <Link to={`/about/`} className="btn">À propos</Link>
                </footer>
            </div >
        );
    }
}


export default Home;