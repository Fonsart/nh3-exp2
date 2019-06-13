/* eslint-disable */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Game.css";
import WebcamCapture from "./WebcamCapture/WebcamCapture";
import moment from 'moment'
import {
  isFirefox,
  isChrome,
  isIOS
} from "react-device-detect";
import Image from 'image-js';

const validBrowser = !(isIOS && isFirefox || isIOS && isChrome);

class Selfie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selfieProcessing:false,
      loadingMosaic:false
    };
  }

  takeSelfie = (selfie) => {
    let date = new Date().getFullYear();
    this.setState({selfieProcessing:true,loadingMosaic:true});
    this.upload(selfie);
  }

  upload = (file) => {
    // First the base64 file (image) needs to be converted to blob to be more easily treated by the server
    fetch(file)
      .then(res => res.blob())
      .then(blob => {
        const fd = new FormData();
        const filename = moment().format('YYYYMMDDhhmmssSS')
        const file = new File([blob], `${filename}.jpg`);
        fd.append('selfie', file)
        // After conversion we can upload blob file to server
        fetch('https://localhost:3001/upload', {method: 'POST', body: fd})
          .then(res => res.json()) 
          .then(async(res) => {
            this.setState({selfieProcessing:false});
            // Image processed (mosaic) has the same name as the image uploaded (selfie)
            const mosaicFileUrl = `https://localhost:3001/outputs/${filename}.jpg`
            let image = await Image.load(mosaicFileUrl);
            this.setState({loadingMosaic:false});
            // Once the server image processing (mosaic building) is finished and the image returned is laoded
            // we can go to the game
            this.props.history.push('/game',{ mosaicFileUrl: mosaicFileUrl })
          })

      })
  }

  render() {

    return (

      <div className="game">
        {validBrowser ? (
            !this.state.selfieProcessing && !this.state.loadingMosaic ? (
              <WebcamCapture takeSelfie={this.takeSelfie} />
              ):(!this.state.selfieProcessing && this.state.loadingMosaic ? (
                <p>Loading...2</p>
              ):(
                <p>Loading...1</p>
              )
            )
          ):(
            <p>Redirect to home?</p>
        )}
      </div>
    );
  }
}

export default withRouter(Selfie);
