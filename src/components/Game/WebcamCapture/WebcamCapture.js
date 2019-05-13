import React, { Component } from "react";
import Webcam from 'react-webcam';
import "./WebcamCapture.css";


class WebcamCapture extends Component {

    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    setRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        let img = this.webcam.getScreenshot();
        this.props.takeSelfie(img);
    };

    render() {
        const videoConstraints = {
            width: this.state.width,
            height: this.state.height,
            facingMode: "user"
            
        };

        const containerStyles = {
            width:this.state.width,
            height:this.state.height
        }
        return (
            <div className="camera" style={containerStyles}>
                <Webcam
                    width={this.state.width}
                    height={this.state.height}
                    audio={false}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
            <a onClick={this.capture} id="openCamera" className="btn btn__secondary btn_capture"><i className="fas fa-camera"></i></a>
            </div>
        );
    }
}


export default WebcamCapture;
