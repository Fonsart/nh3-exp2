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
    this.changeCols = this.changeCols.bind(this);
    this.changeRows = this.changeRows.bind(this);
    this.changeColorBlending = this.changeColorBlending.bind(this);
    this.wheelZoom = this.wheelZoom.bind(this);

    this.state = {
      loadProgress: 0,
      target: null,
      dimensions:{},
      columns: 20,
      rows: 20,
      colorBlending:0.6
    };

    this.imgRef = React.createRef();
  }

  componentWillMount() {
    this.setState({
      target: process.env.PUBLIC_URL + "/images/" + Images[1].name
    });
  }

  wheelZoom(e){
    if(e.deltaY < 0)
    {
      this.setState(
        {
          columns:this.state.columns+1,
          rows:this.state.rows+1 
        });
    }
    else{
      this.setState(
        {
          columns:this.state.columns-1,
          rows:this.state.rows-1 
        })
      }
  }

  changeCols(e){
    this.setState({
      columns:e.target.value
    })
  }

  changeRows(e){
    this.setState({
      rows:e.target.value
    })
  }

  changeColorBlending(e){
    this.setState({
      colorBlending:e.target.value
    })
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
        <div id="control">
              <label htmlFor="col_input">Nb de colonnes</label><input name="col_input" type="text" value={this.state.columns} onChange={this.changeCols} />
              <label htmlFor="row_input">Nb de colonnes</label><input name="row_input" type="text" value={this.state.rows} onChange={this.changeRows} />
              <br />
              <label htmlFor="blending_input">Transparence des couleurs (0-1)</label><input name="blending_input" type="text" value={this.state.colorBlending} onChange={this.changeColorBlending} />
        </div>
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
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
