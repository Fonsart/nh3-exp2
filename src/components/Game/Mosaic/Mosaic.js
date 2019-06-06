import React, { Component } from "react";
import ReactImageMosaic from "react-image-mosaic";
import Images from "../../../assets/images.json";
import PinchToZoom from 'react-pinch-and-zoom'; //Ce composant permet de rendre un canvas "pinchable", "zoomable" et "mouvant"

const colorBlending = 0.4;
const MOS_RESOLUTION = 60;

class Mosaic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            zoom: MOS_RESOLUTION,
            height: 720,
            width: 480
        }
    }

    componentDidMount() {

        let newHeight = this.props.height * 12;
        let newWidth = this.props.width * 12;

        this.setState({
            height: newHeight,
            width: newWidth,
            zoom: MOS_RESOLUTION,
        });

    }


    /**
     * deprecated function
     */
    /*function zooming() {
        if (zoom - ZOOM_STEPS >= ZOOM_MIN) {
            setZoom(zoom - ZOOM_STEPS);
        }
    }*/

    clickedCanvas(data) {
        this.props.onClick(data);
    }

    render() {
        return (
            <div id="mosaic" className={this.props.hidden ? "hidden" : ""}>
                <PinchToZoom>
                    <ReactImageMosaic
                        onClick={this.clickedCanvas.bind(this)}
                        colorBlending={colorBlending}
                        width={this.state.width}
                        height={this.state.height}
                        columns={this.state.zoom}
                        rows={this.state.zoom}
                        sources={Images.map(img => process.env.PUBLIC_URL + "/images/" + img.media.path.split("/")[3])}
                        target={this.props.target}
                        onLoadProgress={this.props.loadProgress}
                    />
                </PinchToZoom>
            </div>

        )
    }

}

export default Mosaic;