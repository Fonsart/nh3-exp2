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

const validBrowser = !(isIOS && isFirefox || isIOS && isChrome);

class Selfie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selfieProcessing:false
    };
  }

  takeSelfie = (selfie) => {
    let date = new Date().getFullYear();
    console.log('Upload selfie to server');
    console.log(selfie)
    this.setState({selfieProcessing:true});
    this.upload(selfie);
  }

  upload = (file) => {
    fetch(file)
      .then(res => res.blob())
      .then(blob => {
        const fd = new FormData();
        const filename = moment().format('YYYYMMDDhhmmssSS')
        const file = new File([blob], `${filename}.jpg`);
        fd.append('selfie', file)

        fetch('https://localhost:3001/upload', {method: 'POST', body: fd})
          .then(res => res.json()) 
          .then(res => {
            console.log(res)
            console.log()
            this.setState({selfieProcessing:false});
            this.props.history.push('/game')
          })

      })
  }

  render() {

    return (

      <div className="game">
        {validBrowser ? (
            !this.state.selfieProcessing ? (
              <WebcamCapture takeSelfie={this.takeSelfie} />
              ):(
              <p>Loading...</p>
            )
          ):(
            <p>Redirect to home</p>
        )}
      </div>
    );
  }
}

export default withRouter(Selfie);
