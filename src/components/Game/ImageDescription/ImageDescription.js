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
            <CSSTransition in={(this.props.show && this.state.mounted)} timeout={500} classNames="desc-node" unmountOnExit>
                <div className="description">
                    <h2>{this.props.titre}</h2>
                    <h3>{this.props.date} {this.props.lieu ? "- " + this.props.lieu :null}</h3>
                    <p>Auteur·e : {this.props.auteur}</p>
                    {!this.props.isSelfie ? (<a href={"https://www.notrehistoire.ch/medias/" + this.props.id} target="_blank">Voir sur notreHistoire.ch</a>) : null}
                </div>
            </CSSTransition>
        )
    }

}

export default ImageDescription;
