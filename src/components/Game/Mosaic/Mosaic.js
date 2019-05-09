import React, { useState, useEffect } from "react";
import ReactImageMosaic from "react-image-mosaic";
import Images from "../../../assets/images.json";

const Mosaic = (props) => {

    const colorBlending = 0.6;
    const ZOOM_STEPS = 4;
    const ZOOM_MIN = 5;
    const ZOOM_MAX = 29;
    const [zoom, setZoom] = useState(ZOOM_MAX);

    useEffect(() => {
        if (!props.hidden) {
            setTimeout(() => zooming(), 100);
        }else{
            setZoom(ZOOM_MAX);
        }
    })

    function zooming() {
        if (zoom - ZOOM_STEPS >= ZOOM_MIN) {
            setZoom(zoom - ZOOM_STEPS);
        }
    }

    function clickedCanvas(data){
        setZoom(ZOOM_MAX);
        props.onClick(data);
    }

    return (
        <div id="mosaic" className={!props.hidden ? "" : "hidden"}>
            <ReactImageMosaic
                onClick={clickedCanvas}
                colorBlending={colorBlending}
                width={props.width}
                height={props.height}
                columns={zoom}
                rows={zoom}
                sources={Images.map(img => process.env.PUBLIC_URL + "/images/" + img.media.path.split("/")[3])}
                target={props.target}
                onLoadProgress={props.loadProgress}
            />
        </div>
    )


}

export default Mosaic;