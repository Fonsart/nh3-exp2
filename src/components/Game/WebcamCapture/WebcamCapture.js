/* eslint-disable */
import React, { Component } from "react";
import Webcam from 'react-webcam';
import "./WebcamCapture.css";

class WebcamCapture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            showBtn: false,
            loading: this.props.loading,
            selfiePaddingTop: (this.props.width*(4/3)-this.props.width)/2
        };
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        let img = this.webcam.getScreenshot();
        this.props.takeSelfie(img,this.state.selfiePaddingTop);
    };

    showButton() {
        this.setState({
            showBtn: true,
        })
    }

    render() {
        const videoConstraints = {
            facingMode: "user"
        };
        const cameraButton = this.state.showBtn ? (<a onClick={this.capture} id="openCamera" className="btn btn__secondary btn_capture"><i className="fas fa-camera"></i></a>) : null;
        return (
            [<div className="camera" style={{position:'relative'}}>
                <div style={{height:`${this.state.selfiePaddingTop}px`, background:'black', position:'absolute', top:0, left:0, width:'100%'}}></div>
                <Webcam
                    audio={false}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    onUserMedia={this.showButton.bind(this)}
                    width={this.props.width}
                    height={this.props.width*(4/3)}
                    videoConstraints={videoConstraints}
                />
                <div style={{height:`${this.state.selfiePaddingTop}px`, background:'black', position:'absolute', bottom:0, left:0, width:'100%'}}></div>
            </div>,cameraButton]
        );
    }
}


export default WebcamCapture;
