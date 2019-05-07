import React, { Component } from "react";
import Webcam, { FACING_MODES, IMAGE_TYPES } from 'react-webcam';
import "./WebcamCapture.css";


class WebcamCapture extends Component {

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        let img = this.webcam.getScreenshot();
        this.props.takeSelfie(img);
    };

    render() {
        const videoConstraints = {
            width: 720,
            height: 1280,
            facingMode: "user"
        };

        return (
            <div>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                />
                <button onClick={this.capture}>Capture photo</button>
            </div>
        );
    }
}


export default WebcamCapture;
