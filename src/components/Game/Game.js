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
import Loading from '../commons/modals/loading/loading';
import Share from '../commons/modals/share/share';

const validBrowser = !(isIOS && isFirefox || isIOS && isChrome);

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
      mosaicLoading: false,
      visited: 0,
      shared: false,
      askSharing: true,

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
      initialState: true,
      imgLoaded: false,
      mosaicLoading: false
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
      selfie: true
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
      mosaicLoading: true
    })

    if (this.state.loadProgress === 1) {
      setTimeout(() => {
        this.setState({
          mosaicLoading: false
        })
      }, 2000);
    }

  }

  clickedImage() {
    let visitedIterator = this.state.visited+1;
    this.setState({
      initialState: !this.state.initialState,
      visited: visitedIterator
    })
  }

  handleImageLoaded() {
    this.setState({
      dimensions: {
        height: this.imgRef.current.height,
        width: this.imgRef.current.width,
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

    this.setState({
      selfie: false,
    });

    if (data.image != this.state.target) {
      this.setState({
        target: data.image,
        initialState: !this.state.initialState,
        imgLoaded: false
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

    if (this.state.loadProgress > 0.9) {
      setTimeout(() => {
        this.setState({
          mosaicLoading: false
        })
      }, 2000);
    }
  }

  denyShare(){
    this.setState({
      askSharing:false,
    })
  }

  shareExperience(){
    this.setState({
      askSharing:false,
      shared:true,
    })
  }

  render() {

    return (
      <div className="game">
        <Loading
          loading={(this.state.initialState && this.state.mosaicLoading)}
        />
        <Share
          deny={this.denyShare.bind(this)}
          share={this.shareExperience.bind(this)}
          show={(this.state.visited === 4 && this.state.askSharing)}
        />
        {this.state.mosaicLoading ? "" : (
          <nav className="mainNav">
            <div className="btn_back navbar-left">
              <Link to={'/'} className="btn btn__secondary"><i className="fas fa-chevron-left"></i></Link>
            </div>
            {!validBrowser ? "" : (
              <div className="navbar-right">
                <a onClick={this.openCamera} id="openCamera" className="btn btn__secondary"><i className="fas fa-camera"></i></a>
              </div>
            )}
          </nav>
        )}


        {this.state.isCamera ? (<WebcamCapture takeSelfie={this.takeSelfie} />) : null}

        <div className="fullBG flex flex-col " id="game">
          <main className="flex justify-center relative">
            {this.state.target ? (
              <Mosaic
                onClick={this.clickedCanvas.bind(this)}
                loadProgress={this.onLoadProgress.bind(this)}
                hidden={this.state.initialState}
                height={this.state.dimensions.height}
                width={this.state.dimensions.width}
                target={this.state.target}
                isSelfie={this.state.selfie}
              />) : null}

            <CSSTransition in={(this.state.initialState && this.state.imgLoaded && !this.state.mosaicLoading)} timeout={5000} classNames="desc-img">
              <div id="target" className={this.state.mosaicLoading ? "hidden" : ""}>
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
