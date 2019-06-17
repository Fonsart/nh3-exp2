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
      loadingMosaic:false,
      mosaicFileUrl: '',
      coor: [],
      tilesWidth: 0,
      nbTiles: 0
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
        fetch('https://nh3-exp2-server.herokuapp.com/upload', {method: 'POST', body: fd})
          .then(res => res.json()) 
          .then(async(res) => {
            this.setState({selfieProcessing:false});
            // Image processed (mosaic) has the same name as the image uploaded (selfie)
            if(res.upload){
              // Download image
              const mosaicFileUrl = `https://nh3-exp2-server.herokuapp.com/outputs/${filename}.jpg`
              // let image = await Image.load(mosaicFileUrl);
              this.setState({mosaicFileUrl:mosaicFileUrl,coord:res.coord,tilesWidth:res.tilesWidth,nbTiles:res.nbTiles});
              // Once the server image processing (mosaic building) is finished and the image returned is laoded
              // we can go to the game
            }else{
              // We should handle better this case
              console.log('error')
            }
          })

      })
  }

  goToGame = () => {
    this.setState({loadingMosaic:false});
    this.props.history.push('/game',{ mosaicFileUrl: this.state.mosaicFileUrl, coord: this.state.coord, tilesWidth: this.state.tilesWidth, nbTiles: this.state.nbTiles })
  }

  render() {

    return (

      <div className="game">
        {validBrowser ? (
            !this.state.selfieProcessing && !this.state.loadingMosaic ? (
              <WebcamCapture takeSelfie={this.takeSelfie} />
              ):(!this.state.selfieProcessing && this.state.loadingMosaic ? (
                [<p key='dsadas'>Loading...2</p>,
                <img key='fidjfsij' src={this.state.mosaicFileUrl} onLoad={() => this.goToGame()} style={{display:'none'}}/>]
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
