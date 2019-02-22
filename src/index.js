import React, { Component } from "react";
import { render } from "react-dom";
import ReactImageMosaic from "react-image-mosaic";
import "./styles.css";
import Images from "./assets/images.full.json";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.loadProgressChanged = this.loadProgressChanged.bind(this);
    this.clickedCanvas = this.clickedCanvas.bind(this);
    this.onImgLoad = this.onImgLoad.bind(this);
    this.state = {
      loadProgress: 0,
      target: null,
      dimensions:{},
      columns: null,
      rows: null,
      colorBlending:0.6,
    };
    this.imgRef = React.createRef();
  }

  componentWillMount() {
    this.setState({
      target: process.env.PUBLIC_URL + "/images/" + Images[1].name
    });
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
        {this.state.loadProgress < 1 ? (
          <pre>
            Loading {Images.length} images... (
            {Math.round(this.state.loadProgress * 100)}%)
          </pre>
        ) : null}

        <ReactImageMosaic
          onClick={this.clickedCanvas}
          onLoadProgress={this.loadProgressChanged}
          colorBlending={this.state.colorBlending}
          width={this.state.dimensions.width}
          height={this.state.dimensions.height}
          columns={this.state.columns ? this.state.columns : 20}
          rows={this.state.rows ? this.state.rows : 20}
          sources={Images.map(img => process.env.PUBLIC_URL + "/images/" + img.name)}
          target={this.imgRef.current}
        />

        {this.state.target ? (
          <div>
            <img className="target" src={this.getImgSrc(this.state.target)} ref={this.imgRef} onLoad={this.onImgLoad} alt="" />
          </div>
        ) : null}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
