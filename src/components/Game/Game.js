/* eslint-disable */

import React, { useState, useEffect, useRef } from "react";
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
import { FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon, TwitterShareButton, TwitterIcon } from 'react-share';

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

  const mapEl = useRef(null);
  const [showMapAnimation, setShowMapAnimation] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [sharingModalIsOpen, setSharingModalIsOpen] = useState(false);
  const lastLocation = useLastLocation();

  const [lastZoomLevel, setLastZoomLevel ] = useState(
    localStorage.getItem('lastZoomLevel') || null
  );

  
  let mapAnimationState = false;
  let mapZoomLevelState = [[0,0], [w,h]];

  if(lastLocation != null){
    // mapAnimationState = lastLocation.pathname == '/selfie' || lastLocation.pathname == '/selfie/' ? true : false; // This used to be used for map zoom animation at the begining of the experience
    // mapZoomLevelState = lastLocation.pathname == '/selfie' || lastLocation.pathname == '/selfie/' ? [[0,0], [w,h]] : [[0,0], [w,h]];
    if(lastLocation.pathname == '/image' || lastLocation.pathname == '/image/'){
      mapZoomLevelState = JSON.parse(lastZoomLevel)  
    }
  }
  
  useEffect(() => setShowMapAnimation(mapAnimationState), []);

  
  const coord = props.location.state.coord
  const rectangles = []
  const nbTiles = props.location.state.nbTiles;
  const tileWidth = (w/(nbTiles*nbTiles))*props.location.state.tilesWidth

  coord.forEach((item,index) => {
    rectangles.push(<Rectangle key={index} color="transparent" bounds={[[(nbTiles-item.x)*tileWidth,(item.y)*tileWidth],[((nbTiles-item.x)-1)*tileWidth,((item.y)+1)*tileWidth]]} onClick={(e) => {console.log(mapEl.current.leafletElement.getBounds()); const lastBounds = mapEl.current.leafletElement.getBounds(); localStorage.setItem('lastZoomLevel', JSON.stringify([[lastBounds._southWest.lat,lastBounds._southWest.lng],[lastBounds._northEast.lat,lastBounds._northEast.lng]]));; console.log(item.thumbRef);props.history.push('/image',{imageName:item.thumbRef})}}/>)
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
            <a onClick={() => setSharingModalIsOpen(true)} id="openCamera" className="btn btn__secondary"><i className="fas fa-share-alt"></i></a>
          </div>
        )}
      </nav>
      <div style={{marginTop:`${props.location.state.paddingTop}px`}}>
        <CSSTransition in={showMapAnimation} timeout={1000} classNames="map-wrapper">
          <Map ref={mapEl} crs={L.CRS.Simple} boundsOptions={[[0,0], [w,h]]} maxZoom={4} zoomControl={false} attributionControl={false} bounds={zoomLevel} maxBounds={[[0,0], [w,h]]} maxBoundsViscosity={1.0} style={{width: `${w}px`, height:`${w}px`}}>
            <ImageOverlay
              url={props.location.state.mosaicFileUrl}
              bounds={[[0,0], [w,h]]}
            />
            {rectangles}
          </Map>
        </CSSTransition>
        <CSSTransition in={showMapAnimation} timeout={4000} classNames="map-howto" className="map-howto">
          <p>Votre exploration peut commencer</p>
        </CSSTransition>
      </div>
      <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => closeModal(false)}
          style={modalStyles}
          contentLabel="Leave Game Modal"
          ariaHideApp={false}
        >
        <article style={{color:'#333',fontSize:'1.2rem',marginBottom:'10px'}}>La mosaïque est éphémère, si vous retournez à l’accueil, elle sera supprimée</article>
        <ModalButton text="Ok" handleClick={() => closeModal(true)} />
        <ModalButton text="Rester ici" handleClick={() => closeModal(false)} />
      </Modal>
      <Modal
          isOpen={sharingModalIsOpen}
          onRequestClose={() => setSharingModalIsOpen(false)}
          style={modalStyles}
          contentLabel="Sharing Modal"
          ariaHideApp={false}
        >
        <article style={{color:'#333',fontSize:'1.2rem',marginBottom:'10px', paddingTop:'20px', paddingBottom: '20px', display: 'flex', justifyContent: 'space-around'}}>
          <FacebookShareButton url={'https://lab.notrehistoire.ch/exp2'} ><FacebookIcon size={32} round={true} /></FacebookShareButton>
          <TwitterShareButton url={'https://lab.notrehistoire.ch/exp2'} ><TwitterIcon size={32} round={true} /></TwitterShareButton>
          <WhatsappShareButton url={'https://lab.notrehistoire.ch/exp2'} ><WhatsappIcon size={32} round={true} /></WhatsappShareButton>
        </article>
        <ModalButton text="Fermer" handleClick={() => setSharingModalIsOpen(false)} />
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
