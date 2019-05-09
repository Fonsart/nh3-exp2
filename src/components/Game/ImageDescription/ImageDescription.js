import React, { useState } from "react";
import { Transition } from "react-transition-group";
import './ImageDescription.css';

const ImageDescription = (props) => {

    return (

        <div className="description" >
            <a href={"https://www.notrehistoire.ch/medias/" + props.id} target="_blank">Voir sur notreHistoire.ch</a>
            <h2>{props.titre}</h2>
            <h4>{props.date} - {props.lieu} </h4>
            <p>Auteur·e : {props.auteur}</p>
        </div>

    )

}


export default ImageDescription;
