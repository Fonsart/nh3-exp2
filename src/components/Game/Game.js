import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import "./Game.css";
import Images from "../../assets/images.json";
import WebcamCapture from "./WebcamCapture/WebcamCapture";
import ImageDescription from "./ImageDescription/ImageDescription";
import Mosaic from "./Mosaic/Mosaic";

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
    this.updateImageData = this.updateImageData.bind(this);

    this.state = {
      initialState: true,
      loadProgress: 0,
      target: null,
      dimensions: { height: {}, width: {} },
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

  shouldComponentUpdate(nextProps) {
    return (nextProps.columns !== this.state.columns
      || nextProps.target !== this.state.target);
  }


  componentWillMount() {
    //get a random starting image
    let imgPath = Images[this.indexFirstImage].media.path;
    let imgName = imgPath.split("/");

    this.setState({
      target: process.env.PUBLIC_URL + "/images/" + imgName[3],
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
    })

  }

  clickedImage() {
    this.setState({
      imgTransition:false,
      initialState: !this.state.initialState,
    })
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

  clickedCanvas(data) {
    console.log(this.getImgObjectFromSrc(this.getImgSrc(data.image)));
    console.log(this.getImgSrc(data.image));

    let imgObject = this.getImgObjectFromSrc(this.getImgSrc(data.image));
    this.updateImageData(imgObject);

    this.setState({
      target: data.image,
      initialState: !this.state.initialState
    })
  }

  getImgObjectFromSrc(src) {

    let imgPath = src.split("/");
    let index = imgPath.length - 1;

    let currentImg = Images.filter(img => {
      let targetPath = img.media.path.split("/");
      return targetPath[3] === imgPath[index]
    });

    return currentImg[0];
  }

  onLoadProgress(progress) {
    this.setState({
      loadProgress: progress
    })
  }

  render() {
    return (
      <div className="game blue-bg">
      <nav className="mainNav">
          <div className="btn_back navbar-left">                    
            <Link to={`/`} className="btn btn__secondary">retour</Link>
            </div>
          <div className="navbar-right">
            <a onClick={this.openCamera} id="openCamera" className="btn "><i className="fas fa-camera"></i></a>
          </div>
      </nav>
      <div className="fullBG flex flex-col " id="game">
        
        {this.state.isCamera ? (<WebcamCapture takeSelfie={this.takeSelfie} />) : null}
        <main className="flex justify-center relative">

          <Mosaic
            onClick={this.clickedCanvas.bind(this)}
            loadProgress={this.onLoadProgress.bind(this)}
            hidden={this.state.initialState}
            height={this.state.dimensions.height}
            width={this.state.dimensions.width}
            target={this.state.target}
            sources={this.state.sources}
            selfie={this.state.isCamera}
          />
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
                />
            : ""}           
          
        </main>
      </div >
      </div>
    );
  }
}

export default Game;
