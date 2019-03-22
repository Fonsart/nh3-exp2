import React, { Component } from "react";
import { render } from "react-dom";
import ReactImageMosaic from "react-image-mosaic";
import "./styles.css";
import Images from "./assets/images.sample.json";
import WebcamCapture from "./components/WebcamCapture/WebcamCapture"

const MAX_COLS = 50;
const MAX_ROWS = 50;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.loadProgressChanged = this.loadProgressChanged.bind(this);
    this.clickedCanvas = this.clickedCanvas.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    this.wheelZoom = this.wheelZoom.bind(this);

    this.state = {
      loadProgress: 0,
      target: null,
      dimensions:{},
      columns: MAX_COLS,
      rows: MAX_ROWS,
      colorBlending:0.6,
      isEmptyState:true,
      selfie:null
    };

    this.imgRef = React.createRef();
  }

  openCamera = () => {
    this.setState({
      isEmptyState: false,
      isCamera: true
    })
  }

  takeSelfie = (selfie) => {
    this.setState({
      target:selfie,
      selfie:selfie,
      isCamera:false,
      isEmptyState:true,
      columns:MAX_COLS,
      rows:MAX_ROWS
    })
  }

  componentWillMount() {
    this.setState({
      target: process.env.PUBLIC_URL + "/images/" + Images[0].name
    });
  }

  wheelZoom(e){
    if(e.deltaY < 0 && this.state.columns < MAX_COLS)
    {
      this.setState(
        {
          columns:this.state.columns+1,
          rows:this.state.rows+1 
        });
    }
    else if(this.state.columns > 1){ 
      this.setState(
        {
          columns:this.state.columns-1,
          rows:this.state.rows-1 
        })
      }
  }

  onImgLoad({target:img}) {
    this.setState({
      dimensions:{
        height:img.offsetHeight,
        width:img.offsetWidth
      }
    });
  }

  clickedCanvas(data) {
    this.setState({
      target: data.image,
      columns:MAX_COLS,
      rows:MAX_ROWS
    });
  }

  loadProgressChanged(progress) {
    this.setState({
      loadProgress: progress
    });
  }

  getImgSrc(img) {
    return typeof img === "string" ? img : img.src;
  }

  render() {
    return (
      <div className="App">
        <div id="intro">
        <h3>Démonstrateur LAB NotreHistoire.ch</h3>
        <h4>Expérience 2</h4>
        <button onClick={this.openCamera} id="openCamera">Take a selfie</button>
        </div>
        {this.state.loadProgress < 1 ? (
          <pre>
            Loading {Images.length} images... (
            {Math.round(this.state.loadProgress * 100)}%)
          </pre>
        ) : null}
        
        <div id="mosaic" onWheel = {this.wheelZoom}>
          <ReactImageMosaic
            onClick={this.clickedCanvas}
            onLoadProgress={this.loadProgressChanged}
            colorBlending={this.state.colorBlending}
            width={this.state.dimensions.width}
            height={this.state.dimensions.height}
            columns={this.state.columns}
            rows={this.state.rows}
            sources={Images.map(img => process.env.PUBLIC_URL + "/images/" + img.name)}
            target={this.imgRef.current}
          />
          
        </div>
        <div id="target">
          {this.state.target ? (
            <div>
              <img className="target" src={this.getImgSrc(this.state.target)} ref={this.imgRef} onLoad={this.onImgLoad} alt="" />
            </div>
          ) : null}
        </div>
        {this.state.isCamera ? (<WebcamCapture takeSelfie={this.takeSelfie} />) : null}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
