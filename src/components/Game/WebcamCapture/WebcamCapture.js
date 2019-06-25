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
            loading: this.props.loading
        };
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
            facingMode: "user",
            height:this.props.width,
            width:this.props.width
        };

        return (
            <div className="camera">

                <Webcam
                    audio={false}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    onUserMedia={this.showButton.bind(this)}
                    width={this.props.width}
                    height={this.props.width}
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
