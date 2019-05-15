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
    }

    componentDidMount = () => {
            this.setState({ mounted: true });
    }


    render() {

        return (
            <CSSTransition in={this.props.show && this.state.mounted} timeout={200} classNames="desc-node">
                <div className="description">
                    <h2>{this.props.titre}</h2>
                    <h3>{this.props.date} - {this.props.lieu} </h3>
                    <p>Auteur·e : {this.props.auteur}</p>
                    <a href={"https://www.notrehistoire.ch/medias/" + this.props.id} target="_blank">Voir sur notreHistoire.ch</a>
                </div>
            </CSSTransition>
        )
    }

}


export default ImageDescription;
