/* eslint-disable */

import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./Game.css";
import {
  isFirefox,
  isChrome,
  isIOS
} from "react-device-detect";
import useWindowDimensions from '../Utils/useWindowDimensions';
import { Map, Marker, Popup, ImageOverlay } from 'react-leaflet'
import L from 'leaflet'

function Game (props) {

  const validBrowser = !(isIOS && isFirefox || isIOS && isChrome);

  const { height, width } = useWindowDimensions();
  const [loaded, setLoaded] = useState(false);
  console.log(height,width)
  let w = width;
  let h = w;

  return (
    <div className="game">
      <nav className="mainNav">
        <div className="btn_back navbar-left">
          <a onClick={() => props.history.push('/selfie')} className="btn btn__secondary"><i className="fas fa-chevron-left"></i></a>
        </div>
        {!validBrowser ? "" : (
          <div className="navbar-right">
            <a onClick={() => props.history.push('/selfie')} id="openCamera" className="btn btn__secondary"><i className="fas fa-camera"></i></a>
          </div>
        )}
      </nav>
      <Map crs={L.CRS.Simple} boundsOptions={[[0,0], [w,h]]} bounds={[[0,0], [w,h]]} maxBounds={[[0,0], [w,h]]} maxBoundsViscosity={1.0} style={{width: `${w}px`, height:`${w}px`}}>
        <ImageOverlay
          url={props.location.state.mosaicFileUrl}
          bounds={[[0,0], [w,h]]}
        />
      </Map>
    </div>
  );
}

export default withRouter(Game);
