import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactImageMosaic from "react-image-mosaic";
import "./Game.css";
import Images from "../../assets/images.json";
import WebcamCapture from "../WebcamCapture/WebcamCapture"
import ImageDescription from "../ImageDescription/ImageDescription"


const MAX_COLS = 50;
const MAX_ROWS = 50;
const ZOOM_STEPS = 5;
const ZOOM_MIN = 5;

const btnStyle = {
  height: '40px',
  backgroundColor: 'rgb(178, 202, 255)',
  textAlign: 'center',
  border: 'none',
  width: '40px',
  borderRadius: '5px',
  fontSize: '16px',
}

class Game extends Component {
  constructor(props) {
    super(props);

    this.loadProgressChanged = this.loadProgressChanged.bind(this);
    this.clickedCanvas = this.clickedCanvas.bind(this);
    this.updateImageData = this.updateImageData.bind(this);

    this.state = {
      initialState: true,
      loadProgress: 0,
      target: null,
      dimensions: { height: {}, width: {} },
      columns: MAX_COLS,
      rows: MAX_ROWS,
      colorBlending: 0.6,
      selfie: null,
      img_title: null,
      img_date: null,
      img_author: null,
      img_id: null,
      img_place: null,
    };

    this.imgRef = React.createRef();

    this.indexFirstImage = Math.floor(Math.random() * Object.keys(Images).length);
  }

  componentWillMount() {
    //get a random starting image
    let imgPath = Images[this.indexFirstImage].media.path;
    let imgName = imgPath.split("/");

    this.setState({
      target: process.env.PUBLIC_URL + "/images/" + imgName[3],
      columns: MAX_COLS,
      rows: MAX_ROWS
    });

    this.updateImageData(Images[this.indexFirstImage]);
  }

  updateImageData(img) {
    if (img != null) {
      this.setState({
        img_title: img.titre,
        img_date: img.date.year,
        img_author: img.author,
        img_id: img.id,
        img_place: img.location
      })
    }
  }

  openCamera = () => {
    this.setState({
      isEmptyState: false,
      isCamera: true
    })
  }

  takeSelfie = (selfie) => {
    this.setState({
      initialState: true,
      target: selfie,
      selfie: selfie,
      isCamera: false,
      isEmptyState: true,
      columns: MAX_COLS,
      rows: MAX_ROWS
    })
  }

  clickedCanvas(data) {
      if (!(this.state.columns - ZOOM_STEPS >= ZOOM_MIN)) {
        clearInterval(this.zoomTimer);
        this.setState({
          target: data.image.src,
          initialState: !this.state.initialState,
          columns: MAX_COLS,
          rows: MAX_ROWS
        });
        this.updateImageData(this.getImgObjectFromSrc(data.image.attributes.src.value));
      }
  }

  clickedImage() {
    this.setState({
      initialState: !this.state.initialState,
    })

    this.zoomTimer = setInterval(() => {
      if (this.state.columns - ZOOM_STEPS >= ZOOM_MIN) {
        console.log(this.zoomTimer)
        this.setState(
          {
            columns: this.state.columns - ZOOM_STEPS,
            rows: this.state.rows - ZOOM_STEPS
          }); 
      }}, 100);
  }

  loadProgressChanged(progress) {
    this.setState({
      loadProgress: progress,
    });
  }

  handleImageLoaded() {
    this.setState({
      dimensions: {
        height: this.imgRef.current.offsetHeight,
        width: this.imgRef.current.offsetWidth,
      }
    });
  }

  getImgSrc(img) {
    return typeof img === "string" ? img : img.src;
  }

  getImgObjectFromSrc(src) {

    let imgPath = src.split("/");

    let currentImg = Images.filter(img => {
      let targetPath = img.media.path.split("/");
      return targetPath[3] === imgPath[2]
    });

    return currentImg[0];
  }


  render() {
    return (
      <div className="Game">
        <div id="intro">
          <Link to="/">Home</Link>
          {Math.round(this.state.loadProgress * 100)}
          <button onClick={this.openCamera} id="openCamera" style={btnStyle}><i className="fas fa-camera"></i></button>
        </div>

        {this.state.isCamera ? (<WebcamCapture takeSelfie={this.takeSelfie} />) : null}

        <div id="mosaic" className={!this.state.initialState ? "" : "hidden"}>
          <ReactImageMosaic
            onClick={this.clickedCanvas}
            onLoadProgress={this.loadProgressChanged}
            colorBlending={this.state.colorBlending}
            width={this.state.dimensions.width}
            height={this.state.dimensions.height}
            columns={this.state.columns}
            rows={this.state.rows}
            sources={Images.map(img => process.env.PUBLIC_URL + "/images/" + img.media.path.split("/")[3])}
            target={this.state.target}
          />
        </div>

        <div id="target" className={this.state.initialState ? "" : "hidden"}>
          <img onLoad={this.handleImageLoaded.bind(this)} onClick={this.clickedImage.bind(this)} className="target" src={this.getImgSrc(this.state.target)} ref={this.imgRef} alt="" />
        </div>

        {this.state.initialState ?
          <ImageDescription
            id={this.state.img_id}
            titre={this.state.img_title}
            auteur={this.state.img_author}
            date={this.state.img_date}
            lieu={this.state.img_place}
          /> : ""}

      </div >
    );
  }
}

export default Game;
