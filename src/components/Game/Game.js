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

function Game (props) {

  const validBrowser = !(isIOS && isFirefox || isIOS && isChrome);

  const { height, width } = useWindowDimensions();
  let w = width;
  let h = w;

  const [showMapAnimation, setShowMapAnimation] = useState(false);
  const lastLocation = useLastLocation();

  
  let mapAnimationState = false;
  let mapZoomLevelState = [[0,0], [w,h]];
  if(lastLocation != null){
    mapAnimationState = lastLocation.pathname == '/selfie' ? true : false;
    mapZoomLevelState = lastLocation.pathname == '/selfie' ? [[w/2,h/2], [w/2,h/2]] : [[0,0], [w,h]];
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
  return (
    <div className="game">
    
      <nav className="mainNav">
        <div className="navbar-left">
          <a onClick={() => props.history.push('/selfie')} className="navbar-left_link-text">Accueil</a>
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
      </div></div>

  );
}

export default withRouter(Game);
