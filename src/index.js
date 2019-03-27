import React, { Component } from "react";
import { render } from "react-dom";
import ReactImageMosaic from "react-image-mosaic";
import "./styles.css";
import Images from "./assets/images.full.json";
import WebcamCapture from "./components/WebcamCapture/WebcamCapture"
import Swipe from "react-easy-swipe"

const MAX_COLS = 30;
const MAX_ROWS = 30;
const ZOOM_STEPS = 2;
const ZOOM_MIN = 4;


export default class App extends Component {
  constructor(props) {
    super(props);

    this.loadProgressChanged = this.loadProgressChanged.bind(this);
    this.clickedCanvas = this.clickedCanvas.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    this.wheelZoom = this.wheelZoom.bind(this);
    this.triggerAnimation = this.triggerAnimation.bind(this);

    this.state = {
      loadProgress: 0,
      target: null,
      dimensions: { height: {}, width: {} },
      columns: MAX_COLS,
      rows: MAX_ROWS,
      colorBlending: 0.6,
      isEmptyState: true,
      selfie: null,
      swipeMode: true,
      swipedDown: true,
    };
    this.imgRef = React.createRef();
  }

  onSwipeStart = (e) => {
    this.setState({ swipedDown: true });
  }

  onSwipeMove = (pos, e) => {
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
  }

  triggerAnimation = () => {
    alert("coucou");
  }

  openCamera = () => {
    this.setState({
      isEmptyState: false,
      isCamera: true
    })
  }

  takeSelfie = (selfie) => {
    this.setState({
      target: selfie,
      selfie: selfie,
      isCamera: false,
      isEmptyState: true,
      columns: MAX_COLS,
      rows: MAX_ROWS
    })
  }

  componentWillMount() {
    this.setState({
      target: process.env.PUBLIC_URL + "/images/" + Images[21].name
    });
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

  onImgLoad({ target: img }) {
    this.setState({
      dimensions: {
        height: img.height,
        width: img.width
      },
      columns: MAX_COLS,
      rows: MAX_ROWS
    });
  }

  clickedCanvas(data) {
    if (this.state.columns - ZOOM_STEPS >= ZOOM_MIN) {
      this.setState(
        {
          columns: this.state.columns - ZOOM_STEPS,
          rows: this.state.rows - ZOOM_STEPS
        });
    } else {
      if (this.state.swipedDown) {
        this.setState({
          target: data.image,
        });
      }
      /*if (this.state.swipedDown) {
        this.setState({
          target: data.image,
        });
      }*/
    }
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
      const hideMosaic = this.state.swipedDown ? { display: 'initial' } : { display: 'none' };

      return (
        <div className="App">
          <div id="intro">
            <h3>PIXPLORER beta</h3>
            <button onClick={this.openCamera} id="openCamera">Take a selfie</button>
          </div>

          {this.state.isCamera ? (<WebcamCapture takeSelfie={this.takeSelfie} />) : null}

          <Swipe
            onSwipeMove={this.onSwipeMove}
            onSwipeUp={this.onSwipeUp}
          >
            <div id="mosaic" onWheel={this.wheelZoom} style={hideMosaic}>

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
                  <img className="target" src={this.getImgSrc(this.state.target)} ref={this.imgRef} onLoad={this.onImgLoad.bind(this)} alt="" />
                </div>
              ) : null}
            </div>
          </Swipe>
        </div >
      );
    }
  }

  const rootElement = document.getElementById("root");
  render(<App />, rootElement);
