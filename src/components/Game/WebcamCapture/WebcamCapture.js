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
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentWillMount() {
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
            facingMode: "user",
            height:this.state.width,
            width:this.state.width
        };

        return (
            <div className="camera">

                <Webcam
                    audio={false}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    onUserMedia={this.showButton.bind(this)}
                    width={this.state.width}
                    height={this.state.width}
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
