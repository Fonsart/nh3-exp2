import React, { Component } from "react";
import Webcam, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

class WebcamCapture extends Component {

    setRef = webcam => {
        this.webcam = webcam;
    };
     
    onTakePhoto = (img) => {
        // const imageSrc = this.webcam.getScreenshot();
        this.props.takeSelfie(img);
    };
     
    
    render() {
    return (
        <div className="camera">
            <Webcam
                ref={this.webcam}
                onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                idealFacingMode={FACING_MODES.USER}
                imageType = {IMAGE_TYPES.JPG}
                isImageMirror={false}
            />
        </div>
    );
    }
}


export default WebcamCapture;
  