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
                <main className="home-main">
                    <div className="home-header">
                        <h2 className="home-header_title">Explorez les visages de notre histoire.</h2>
                    </div>
                    <div className="home-title">
                        <h1>PixPlorer</h1>
                    </div>
                    <div className="home-content">
                        <p className="home-content_text">Commencez par prendre un selfie</p>
                    </div>
                {!((isIOS && isFirefox) || (isIOS && isChrome)) && isMobile ? (
                    <div className='home-actions'>
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
                </main>                 
                <footer className="mt-auto">
                    <Link to={`/about`} className="footer_link">À propos</Link>
                </footer>
            </div >
        );
    }
}


export default Home;