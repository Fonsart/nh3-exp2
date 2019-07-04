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
import { FlagSpinner } from "react-spinners-kit";
import anime from 'animejs';
import Anime from 'react-anime';


const validBrowser = !(isIOS && isFirefox || isIOS && isChrome);

class Selfie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selfieProcessing:true,
      loadingMosaic:true,
      mosaicFileUrl: '',
      coor: [],
      tilesWidth: 0,
      nbTiles: 0,
      selfiePaddingTop: 0 // This state is used to keep the same padding top for the game as the selfie... Maybe it's useless...
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentWillMount() {
      this.updateWindowDimensions();
  }

  updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
  }


  takeSelfie = (selfie,selfiePaddingTop) => {
    let date = new Date().getFullYear();
    this.setState({selfieProcessing:true,loadingMosaic:true,selfiePaddingTop:selfiePaddingTop});
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
            if(res.upload){
              // Download image
              const mosaicFileUrl = `https://localhost:3001/outputs/${filename}.jpg`
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
    this.props.history.push('/game',{ mosaicFileUrl: this.state.mosaicFileUrl, coord: this.state.coord, tilesWidth: this.state.tilesWidth, nbTiles: this.state.nbTiles, paddingTop: this.state.selfiePaddingTop })
  }

  render() {

    const gridElementWidth = 20;
    const gridElementMargin = 1;
    const gridElement = <div style={{width:`${gridElementWidth}px`,height:`${gridElementWidth}px`,backgroundColor:'#145185',marginRight:`${gridElementMargin}px`,marginLeft:`${gridElementMargin}px`, marginBottom:`${gridElementMargin*2}px`}}></div>;
    const gridElements = [];
    const gridElementsCols = Math.floor(this.state.width/(gridElementWidth+gridElementMargin*2))
    const gridElementsRows = 5;
    for (var i = 0; i < gridElementsCols*gridElementsRows; i++) {
      gridElements.push(gridElement)
    }

    return (

      <div className="game">
        {validBrowser ? (
            !this.state.selfieProcessing && !this.state.loadingMosaic ? (
              <div className="selfie">
                <nav className="mainNav">
                  <div className="btn_back navbar-left">
                    <a onClick={() => this.props.history.push('/')} className="btn btn__secondary"><i className="fas fa-chevron-left"></i></a>
                  </div>
                </nav>
                <WebcamCapture width={this.state.width} takeSelfie={this.takeSelfie} />
              </div>
              ):(!this.state.selfieProcessing && this.state.loadingMosaic ? (
                [<div className="spinner">
                  {gridElements}</div>,
                <img key='fidjfsij' src={this.state.mosaicFileUrl} onLoad={() => this.goToGame()} style={{display:'none'}}/>]
              ):(
                <div className="spinner">
                  <div className="gridElements">
                  <Anime
                    loop={true}
                    delay={anime.stagger(200, {grid: [gridElementsCols, gridElementsRows], from: 'center'})}
                    scale={[{value: .1, easing: 'easeOutSine', duration: 500},{value: 1, easing: 'easeInOutQuad', duration: 1200}]}>
                  {gridElements}
                  </Anime>
                  </div>
                </div>
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
