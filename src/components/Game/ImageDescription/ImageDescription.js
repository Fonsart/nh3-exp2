import React, { Component, useState, useEffect } from "react";
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
                    <a href={"https://www.notrehistoire.ch/medias/" + this.props.id} target="_blank">Voir sur notreHistoire.ch</a>
                    <h2>{this.props.titre}</h2>
                    <h4>{this.props.date} - {this.props.lieu} </h4>
                    <p>Auteur·e : {this.props.auteur}</p>
                </div>
            </CSSTransition>
        )
    }

}


export default ImageDescription;
