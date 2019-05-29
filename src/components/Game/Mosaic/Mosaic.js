import React, { useState, useEffect } from "react";
import ReactImageMosaic from "react-image-mosaic";
import Images from "../../../assets/images.json";
import SaveSelfie from "../../commons/modals/saveSelfie/saveSelfie";

const Mosaic = (props) => {

    const colorBlending = 0.4;
    const ZOOM_STEPS = 4;
    const ZOOM_MIN = 5;
    const ZOOM_MAX = 80;
    const [zoom, setZoom] = useState(ZOOM_MAX);
    const [clickedOnce, setClicked] = useState(false);
    const [height, setHeight] = useState(720);
    const [width, setWidth] = useState(480);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!props.hidden) {
            if (clickedOnce) {
                setTimeout(() => zooming(), 300);
                setOpen(false);
            } else {
                setOpen(true);
                setHeight(props.height);
                setWidth(props.width);
            }
        } else {
            setOpen(false);
            setClicked(false);
            setZoom(ZOOM_MAX);
        }
    })

    function zooming() {
        if (zoom - ZOOM_STEPS >= ZOOM_MIN) {
            setZoom(zoom - ZOOM_STEPS);
        }
    }

    function clickedCanvas(data) {
        if (clickedOnce) {
            setZoom(ZOOM_MAX);
            props.onClick(data);
        } else {
            setClicked(true);
            /*setHeight(props.height*10);
            setWidth(props.width*10);*/
        }
    }

    return (
        <div id="mosaic" className={!props.hidden ? "" : "hidden"}>
            <ReactImageMosaic
                onClick={clickedCanvas}
                colorBlending={colorBlending}
                width={width}
                height={height}
                columns={zoom}
                rows={zoom}
                sources={Images.map(img => process.env.PUBLIC_URL + "/images/" + img.media.path.split("/")[3])}
                target={props.target}
                onLoadProgress={props.loadProgress}
            />
            <SaveSelfie
                open={open}
                isSelfie={props.isSelfie}
            />

        </div>
    )

}

export default Mosaic;