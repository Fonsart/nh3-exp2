import React, { Component } from "react";
import './ImageDescription.css';

class ImageDescription extends Component {
    constructor(props){
        super(props);

        this.state ={
            loaded:false,
        }

    }
    
    render() {
    return (
        <div className="description">
            <a href={"https://www.notrehistoire.ch/medias/"+this.props.id} target="_blank">Voir sur notreHistoire.ch</a>
            <h2>{this.props.titre}</h2>
            <h4>{this.props.date} - {this.props.lieu} </h4>
            <p>Auteur·e : {this.props.auteur}</p>
        </div>
    );
    }
}


export default ImageDescription;
  