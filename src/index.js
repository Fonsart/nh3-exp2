import React, { Component } from "react";
import { render } from "react-dom";
import ReactImageMosaic from "react-image-mosaic";
import "./styles.css";
import Images from "./assets/images.full.json";

const MAX_COLS = 80;
const MAX_ROWS = 80;

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
      columns: MAX_COLS,
      rows: MAX_ROWS,
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
        <div id="intro"><h1>Démonstrateur NotreHistoire.ch - LAB</h1>
        <h2>Expérience 2</h2>
        <p>Cette application démontre l'intéraction de base imaginée pour l'expérience 2 du LAB, proposée par l'institut MEI (Media Engineering Institute) de la HEIG-VD (Haute École d'Ingénierie et de Gestion du canton de Vaud).</p>
        <h3>Contrôles</h3>
        <ul>
          <li>Utilisez la molette de la souris au dessus de la mosaïque pour modifier sa résolution (résolution actuelle : {this.state.columns + "x" + this.state.rows})
          </li>
          <li>Cliquez sur une "tuile" de la mosaïque pour charger l'image correspondante</li>
        </ul>
        <h3>Divers</h3>
        <ul>
          <li>Le set utilisé pour le démonstrateur est composé de 86 images issues du site web <a href="http://www.notrehistoire.ch">notrehistoire.ch</a></li>
        </ul>
        <i>MEI - 2019 - Romain Sandoz</i>
        </div>
        {this.state.loadProgress < 1 ? (
          <pre>
            Loading {Images.length} images... (
            {Math.round(this.state.loadProgress * 100)}%)
          </pre>
        ) : null}
        <div id="control">
              {/*<label htmlFor="col_input">Nb de colonnes</label><input name="col_input" type="text" value={this.state.columns} onChange={this.changeCols} />
              <label htmlFor="row_input">Nb de colonnes</label><input name="row_input" type="text" value={this.state.rows} onChange={this.changeRows} />
            <br />*/}
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
