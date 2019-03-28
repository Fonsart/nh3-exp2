import React, { Component } from "react";
import { render } from "react-dom";
import ReactImageMosaic from "react-image-mosaic";
import "./styles.css";
import Images from "./assets/images.full.json";
import WebcamCapture from "./components/WebcamCapture/WebcamCapture"
import ImageDescription from "./components/ImageDescription/ImageDescription"

import Swipe from "react-easy-swipe"


const MAX_COLS = 30;
const MAX_ROWS = 30;
const ZOOM_STEPS = 2;
const ZOOM_MIN = 4;

const btnStyle = {
  height: '40px',
  backgroundColor: 'rgb(178, 202, 255)',
  textAlign: 'center',
  border: 'none',
  width: '40px',
  borderRadius: '5px',
  fontSize: '16px',
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.loadProgressChanged = this.loadProgressChanged.bind(this);
    this.clickedCanvas = this.clickedCanvas.bind(this);
    this.wheelZoom = this.wheelZoom.bind(this);

    this.state = {
      initialState: true,
      loadProgress: 0,
      target: null,
      dimensions: { height: {}, width: {} },
      columns: MAX_COLS,
      rows: MAX_ROWS,
      colorBlending: 0.6,
      selfie: null,
      swipedDown: true,
      img_title:null,
      img_date:null,
      img_author:null,
      img_id:null,
      img_place:null,
    };
    this.imgRef = React.createRef();
  }

  componentWillMount() {
    //get a random starting image
    let index = Math.floor(Math.random() * Object.keys(Images).length);
    
    this.setState({
      target: process.env.PUBLIC_URL + "/images/" + Images[index].name,
    });

    this.updateImageData(Images[index]);

  }
  

  updateImageData(img){    
    if(img){
      this.setState({
        img_title:img.titre,
        img_date:img.date,
        img_author:img.auteur,
        img_id:img._id,
        img_place:img.lieu
      })
    }else{
      let imgName = typeof this.state.target === "string" ? this.state.target : this.state.target.attributes.src.value;
      let currentImg  = Images.filter(img => {return process.env.PUBLIC_URL + "/images/" +img.name === imgName});
      
      console.log(imgName);
      console.log(currentImg);

      this.updateImageData(currentImg[0]);
    
    }
    
  }

  /* onSwipeMove = (pos, e) => {
    if (this.state.swipedDown) {
      if (this.state.columns - ZOOM_STEPS >= ZOOM_MIN) {
        this.state.swipeMode ? (
          this.setState(
            {
              columns: this.state.columns - ZOOM_STEPS,
              rows: this.state.rows - ZOOM_STEPS
            })
        ) : (this.triggerAnimation())
      }
    }
    return true;
  }

  onSwipeUp = (e) => {
    this.setState(
      {
        columns: this.state.columns + ZOOM_STEPS,
        rows: this.state.rows + ZOOM_STEPS
      })
  }*/

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


  wheelZoom(e) {
    if (e.deltaY < 0 && this.state.columns < MAX_COLS) {
      this.setState(
        {
          columns: this.state.columns + ZOOM_STEPS,
          rows: this.state.rows + ZOOM_STEPS
        });
    }
    else if (this.state.columns > ZOOM_MIN) {
      this.setState(
        {
          columns: this.state.columns - ZOOM_STEPS,
          rows: this.state.rows - ZOOM_STEPS
        })
    }
  }

  clickedCanvas(data) {
    if (this.state.columns - ZOOM_STEPS >= ZOOM_MIN) {
      this.setState(
        {
          columns: this.state.columns - ZOOM_STEPS,
          rows: this.state.rows - ZOOM_STEPS
        });
    } else {
      this.setState({
        target: data.image,
        initialState: !this.state.initialState,
      },
      this.updateImageData
      );
    }
  }

  loadProgressChanged(progress) {
    this.setState({
      loadProgress: progress
    });

    if (progress > 0.9) {
      this.setState({
        dimensions: {
          height: this.imgRef.current.height,
          width: this.imgRef.current.width,
        },
        columns: MAX_COLS,
        rows: MAX_ROWS
      });
    }
  }

  getImgSrc(img) {
    return typeof img === "string" ? img : img.src;
  }

  render() {

    const imageClick = () => {
      this.setState({
        initialState: !this.state.initialState,
      })
    }

    return (
      <div className="App">
        <div id="intro">
          <h2>PIXPLORER beta</h2>
          <button onClick={this.openCamera} id="openCamera" style={btnStyle}><i className="fas fa-camera"></i></button>
        </div>

        {this.state.isCamera ? (<WebcamCapture takeSelfie={this.takeSelfie} />) : null}

        <Swipe
          onSwipeMove={this.onSwipeMove}
          onSwipeUp={this.onSwipeUp}
        >
          <div id="mosaic" onWheel={this.wheelZoom}>
            {!this.state.initialState ? (
              <ReactImageMosaic
                onClick={this.clickedCanvas}
                onLoadProgress={this.loadProgressChanged}
                colorBlending={this.state.colorBlending}
                width={this.state.dimensions.width}
                height={this.state.dimensions.height}
                columns={this.state.columns}
                rows={this.state.rows}
                sources={Images.map(img => process.env.PUBLIC_URL + "/images/" + img.name)}
                target={this.state.target}
              />
            ) : ""}
          </div>

          <div id="target">
            {this.state.target ? (
              <div>
                <img onClick={imageClick} className="target" src={this.getImgSrc(this.state.target)} ref={this.imgRef} alt="" />
              </div>
            ) : null}
          </div>
        </Swipe>
        {this.state.initialState ? 
        <ImageDescription
          id={this.state.img_id}
          titre={this.state.img_title}
          auteur={this.state.img_author}
          date={this.state.img_date}
          lieu={this.state.img_place}
        /> : "" }

      </div >
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
