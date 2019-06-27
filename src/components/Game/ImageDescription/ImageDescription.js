/* eslint-disable */

import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import './ImageDescription.css';

class ImageDescription extends Component {


    constructor(props) {
        super(props);
        this.state = {
            mounted: false
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentWillMount() {
        this.updateWindowDimensions();
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentDidMount(){
        this.setState({ mounted: true });
        const height = this.divElement;
        console.log(height)
    }

    render() {

        return (
            <CSSTransition in={(this.state.mounted)} timeout={500} classNames="desc-node" unmountOnExit>
                <div className='image-description'>
                    <div className="image">
                        <img src='https://localhost:3001/raw-images/uvjzTcpQnxVj1M2KAMGj8SdHTYqZE7bJg4RzkKy6.jpeg' width={777} height={1146}/>,
                    </div>
                    <div className="description"
                        ref={ (divElement) => this.divElement = divElement}
                    >
                        <nav className="mainNav">
                            <div className="btn_back navbar-left">
                                <a onClick={() => props.history.push('/selfie')} className="btn btn__secondary"><i className="fas fa-chevron-left"></i></a>
                            </div>
                            <div className="navbar-right">
                                <a onClick={() => props.history.push('/selfie')} id="openCamera" className="btn btn__secondary"><i className="fas fa-camera"></i></a>
                            </div>
                        </nav>
                        <h2>{this.props.titre}</h2>
                        <h3>{this.props.date} {this.props.lieu ? "- " + this.props.lieu :null}</h3>
                        <p>Auteur·e : {this.props.auteur}</p>
                        <a href={"https://www.notrehistoire.ch/medias/" + this.props.id} target="_blank">Voir sur notreHistoire.ch</a>
                    </div>
                </div>
            </CSSTransition>
        )
    }

}

export default ImageDescription;
