/* eslint-disable */
import React, { Component } from "react";
import Webcam from 'react-webcam';
import "./WebcamCapture.css";
import Modal from 'react-responsive-modal';
import {PulseLoader} from 'react-spinners';

class WebcamCapture extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            showBtn: false
        };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
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

    showButton() {
        this.setState({
            showBtn: true,
        })
    }

    render() {
        const videoConstraints = {
            facingMode: "user"
        };

        const containerStyles = {
            width: this.state.width,
            height: this.state.height
        }
        return (
            <div className="camera" style={containerStyles}>
                <Webcam
                    width={this.state.width}
                    height={this.state.height}
                    audio={false}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    onUserMedia={this.showButton.bind(this)}
                    videoConstraints={videoConstraints}
                />
                {this.state.showBtn ? (
                    <a onClick={this.capture} id="openCamera" className="btn btn__secondary btn_capture"><i className="fas fa-camera"></i></a>
                ) : ""}
            </div>
        );
    }
}


export default WebcamCapture;
