/* eslint-disable */

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import "./Game.css";
import {
  isFirefox,
  isChrome,
  isIOS
} from "react-device-detect";
import useWindowDimensions from '../Utils/useWindowDimensions';
import { Map, Rectangle, ImageOverlay } from 'react-leaflet'
import L from 'leaflet'
import { CSSTransition } from 'react-transition-group';
import Modal from 'react-modal';

const modalStyles = {
  content : {
    top: '50%',
    left: 0,
    right: 0,
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(0, -50%)',
    marginRight: '10px',
    marginLeft: '10px'
  },
  overlay: {
    zIndex: 99999,
  }
};


function Game (props) {

  const validBrowser = !(isIOS && isFirefox || isIOS && isChrome);

  const { height, width } = useWindowDimensions();
  let w = width;
  let h = w;

  const [showMapAnimation, setShowMapAnimation] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const lastLocation = useLastLocation();

  
  let mapAnimationState = false;
  let mapZoomLevelState = [[0,0], [w,h]];
  if(lastLocation != null){
    mapAnimationState = lastLocation.pathname == '/selfie' || lastLocation.pathname == '/selfie/' ? true : false;
    mapZoomLevelState = lastLocation.pathname == '/selfie' || lastLocation.pathname == '/selfie/' ? [[w/2,h/2], [w/2,h/2]] : [[0,0], [w,h]];
  }
  
  useEffect(() => setShowMapAnimation(mapAnimationState), []);

  
  const coord = props.location.state.coord
  const rectangles = []
  const nbTiles = props.location.state.nbTiles;
  const tileWidth = (w/(nbTiles*nbTiles))*props.location.state.tilesWidth
  coord.forEach((item,index) => {
    rectangles.push(<Rectangle key={index} color="transparent" bounds={[[(nbTiles-item.x)*tileWidth,(item.y)*tileWidth],[((nbTiles-item.x)-1)*tileWidth,((item.y)+1)*tileWidth]]} onClick={(e) => {console.log(item.thumbRef);props.history.push('/image',{imageName:item.thumbRef})}}/>)
  })
  const [zoomLevel, setZoomLevel] = useState(mapZoomLevelState);

  const closeModal = (goToHome) => {
    goToHome ? props.history.push('/') : setModalIsOpen(false)
  }

  return (
    <div className="game">
    
      <nav className="mainNav">
        <div className="navbar-left">
          <a onClick={() => setModalIsOpen(true)} className="navbar-left_link-text">Accueil</a>
        </div>
        {!validBrowser ? "" : (
          <div className="navbar-right">
            <a onClick={() => props.history.push('/selfie')} id="openCamera" className="btn btn__secondary"><i className="fas fa-camera"></i></a>
          </div>
        )}
      </nav>
      <div style={{marginTop:`${props.location.state.paddingTop}px`}}>
        <CSSTransition in={showMapAnimation} timeout={1000} classNames="map-wrapper">
        <Map crs={L.CRS.Simple} boundsOptions={[[0,0], [w,h]]} maxZoom={4} zoomControl={false} attributionControl={false} bounds={zoomLevel} maxBounds={[[0,0], [w,h]]} maxBoundsViscosity={1.0} style={{width: `${w}px`, height:`${w}px`}}>
          <ImageOverlay
            url={props.location.state.mosaicFileUrl}
            bounds={[[0,0], [w,h]]}
            onLoad={() => {
              if(mapAnimationState){
                setTimeout(() => {
                  setZoomLevel([[0,0], [w,h]])
                },1200)
              }
            }}
          />
          {rectangles}
        </Map>
        </CSSTransition>
      </div>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => closeModal(false)}
          style={modalStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
        <article style={{color:'#333',fontSize:'1.2rem',marginBottom:'10px'}}>La mosaïque est éphémère, si vous retournez à l’accueil, elle sera supprimée</article>
        <ModalButton text="Ok" handleClick={() => closeModal(true)} />
        <ModalButton text="Rester ici" handleClick={() => closeModal(false)} />
      </Modal>
    </div>

  );
}

function ModalButton (props) {
  
  const buttonStyle = {
    display:"inline-block",
    padding:"0.35em 1.2em",
    border:"0.1em solid #333",
    margin:"0 0.3em 0.3em 0",
    borderRadius:"0.12em",
    boxSizing: "border-box",
    textDecoration:"none",
    fontWeight:300,
    color:"#333",
    textAlign:"center"
  }
  return(
    <a style={buttonStyle} onClick={props.handleClick}>{props.text}</a>
  )
}

export default withRouter(Game);
