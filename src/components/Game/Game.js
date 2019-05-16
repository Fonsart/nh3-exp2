/* eslint-disable */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Game.css";
import Images from "../../assets/images.json";
import WebcamCapture from "./WebcamCapture/WebcamCapture";
import ImageDescription from "./ImageDescription/ImageDescription";
import Mosaic from "./Mosaic/Mosaic";
import { CSSTransition } from "react-transition-group";
import {
  isFirefox,
  isChrome,
  isIOS
} from "react-device-detect";
import Modal from 'react-responsive-modal';
import { GridLoader } from 'react-spinners';


class Game extends Component {
  constructor(props) {
    super(props);
    this.updateImageData = this.updateImageData.bind(this);

    this.state = {
      isCamera: true,
      initialState: false,
      loadProgress: 0,
      target: null,
      dimensions: { height: {}, width: {} },
      selfie: true,
      img_title: null,
      img_date: null,
      img_author: null,
      img_id: null,
      img_place: null,
      imgLoaded: false,
      mosaicLoading: true,
    };

    this.imgRef = React.createRef();
    this.indexFirstImage = Math.floor(Math.random() * Object.keys(Images).length);
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.columns !== this.state.columns
      || nextProps.target !== this.state.target);
  }

  componentDidMount() {
    this.setState({
      initialState: true
    })
  }

  componentWillMount() {
    /*//get a random starting image
    let imgPath = Images[this.indexFirstImage].media.path;
    let imgName = imgPath.split("/");

    this.setState({
      target: process.env.PUBLIC_URL + "/images/" + imgName[3],
    });

    this.updateImageData(Images[this.indexFirstImage]);*/
  }

  componentWillUnmount() {
    this.setState({
      initialState: false,
      imgLoaded: false
    })
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
      isCamera: true,
      selfie: true,
      mosaicLoading:true,
    })
  }

  takeSelfie = (selfie) => {
    let date = new Date().getFullYear();

    this.setState({
      initialState: true,
      target: selfie,
      selfie: true,
      isCamera: false,
      img_title: "Vous-même",
      img_date: date,
      img_author: "Vous",
      img_id: null,
      img_place: null,
      imgLoaded: false,
    })

    if(this.state.loadProgress === 1){
      setTimeout(() => {
        this.setState({
          mosaicLoading: false
        })
      }, 2000);
    }
    
  }

  clickedImage() {
    if (this.state.selfie) {
      this.setState({
        selfie: !this.state.selfie,
      })
    }

    this.setState({
      initialState: !this.state.initialState,
      imgLoaded: false
    })

  }

  handleImageLoaded() {
    this.setState({
      dimensions: {
        height: this.imgRef.current.offsetHeight,
        width: this.imgRef.current.offsetWidth,
      },
      imgLoaded: true
    });
  }

  getImgSrc(img) {
    return typeof img === "string" ? img : img.src;
  }

  clickedCanvas(data) {

    let imgObject = this.getImgObjectFromSrc(this.getImgSrc(data.image));
    this.updateImageData(imgObject);

    if (data.image != this.state.target) {
      this.setState({
        target: data.image,
        initialState: !this.state.initialState
      })
    }
    else {
      this.setState({
        imgLoaded: true,
        initialState: !this.state.initialState
      })
    }
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

    if (this.state.loadProgress === 1) {
      setTimeout(() => {
        this.setState({
          mosaicLoading: false
        })
      }, 2000);
    }
  }

  render() {
    return (
      <div className="game">
        <nav className="mainNav">
          <div className="btn_back navbar-left">
            <Link to={'/'} className="btn btn__secondary"><i className="fas fa-chevron-left"></i></Link>
          </div>
          {isIOS && isFirefox || isIOS && isChrome ? "" : (
            <div className="navbar-right">
              <a onClick={this.openCamera} id="openCamera" className="btn btn__secondary"><i className="fas fa-camera"></i></a>
            </div>
          )}
        </nav>

        {this.state.isCamera ? (<WebcamCapture takeSelfie={this.takeSelfie} />) : null}

        <div className="fullBG flex flex-col " id="game">
          <main className="flex justify-center relative">
            {this.state.target ? (<Mosaic
              onClick={this.clickedCanvas.bind(this)}
              loadProgress={this.onLoadProgress.bind(this)}
              hidden={this.state.initialState}
              height={this.state.dimensions.height}
              width={this.state.dimensions.width}
              target={this.state.target}
            />) : null}

            <GridLoader
              sizeUnit={"px"}
              size={20}
              color={'#145185'}
              loading={this.state.mosaicLoading}
            />
            <CSSTransition in={this.state.initialState && this.state.imgLoaded} timeout={500} classNames="desc-img" >
              <div id="target">
                <img onLoad={this.handleImageLoaded.bind(this)} onClick={this.clickedImage.bind(this)} className="target" src={this.state.target ? this.getImgSrc(this.state.target) : null} ref={this.imgRef} alt="" />
              </div>
            </CSSTransition>

            <ImageDescription
              id={this.state.img_id}
              titre={this.state.img_title}
              auteur={this.state.img_author}
              date={this.state.img_date}
              lieu={this.state.img_place}
              show={(this.state.initialState && this.state.imgLoaded && !this.state.mosaicLoading)}
              isSelfie={this.state.selfie}
            />

          </main>
        </div>
      </div>
    );
  }
}

export default Game;
