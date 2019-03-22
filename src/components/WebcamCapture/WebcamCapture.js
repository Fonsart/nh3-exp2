import React, { Component } from "react";
import Webcam from "react-webcam";
import "./WebcamCapture.css";

const webcamStyle = {
    height:'100%',
    width:'100%',
    left:'0',
    top:'0',
    zIndex:'100',
    position:'absolute'
}

const cameraButton = {
    bottom:'20px',
    zIndex:'110',
    position:'absolute'
}

class WebcamCapture extends Component {
    setRef = webcam => {
        this.webcam = webcam;
    };
     
    capture = () => {
//        const imageSrc = this.webcam.getScreenshot();
        this.props.takeSelfie(this.webcam.getScreenshot());
    };
     
    
    render() {
    const videoConstraints = {
        facingMode: {exact:"user"}
    };
    
    return (
        <div>
        <Webcam
            style={webcamStyle}
            audio={false}
            height={700}
            ref={this.setRef}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
        />
        <button style={cameraButton} onClick={this.capture}>Capture photo</button>
        </div>
    );
    }
}

export default WebcamCapture;
  