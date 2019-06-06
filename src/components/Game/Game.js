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
      initialState: true,
      isCamera: true,
      loadProgress: 0,
      target: null,
      dimensions: { height: null, width: null },
      selfie: null,
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
      showImage: false

    };

    this.imgRef = React.createRef();
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.columns !== this.state.columns
      || nextProps.target !== this.state.target);
  }

  componentDidMount() {
    this.setState({
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
      imgLoaded: false,
      showImage: false,
    })
  }

  takeSelfie = (selfie) => {
    let date = new Date().getFullYear();

    this.setState({
      selfie: selfie,
      isCamera: false,
      img_title: "Vous-même",
      img_date: date,
      img_author: "Vous",
      img_id: null,
      img_place: null,
      mosaicLoading: true,
    })

    if (this.state.loadProgress === 1) {
      setTimeout(() => {
        this.setState({
          mosaicLoading: false,
          imgLoaded: true,
        })
      }, 3000);
    }

  }

  clickedImage() {
    let visitedIterator = this.state.visited + 1;
    this.setState({
      showImage: false,
      visited: visitedIterator
    })
  }

  handleImageLoaded() {
    this.setState({
      initialState: false,
      imgLoaded: true,
      dimensions: {
        height: this.imgRef.current.height,
        width: this.imgRef.current.width
      }
    });
  }

  getImgSrc(img) {
    return typeof img === "string" ? img : img.src;
  }

  clickedCanvas(data) {

    let imgObject = this.getImgObjectFromSrc(this.getImgSrc(data.image));
    this.updateImageData(imgObject);

    this.setState({
      clickedTarget: data.image,
      showImage: true
    });
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

    if (this.state.loadProgress > 0.95) {
      this.setState({
        mosaicLoading: false
      })
    }
  }

  denyShare() {
    this.setState({
      askSharing: false,
    })
  }

  shareExperience() {
    this.setState({
      askSharing: false,
      shared: true,
    })
  }

  previous() {
    if (this.state.showImage) {
      this.setState({
        showImage: !this.state.showImage,
      })
    }
  }

  render() {

    return (
      <div className="game">
        /**
        LOADING SCREEN 
        This component uses the Modal component along with react-spinners. Is shown whenever the mosaic is loading  */
        <Loading
          loading={(this.state.mosaicLoading)}
        />

        /**
        CAMERA VIEW 
        The camera Component is shown whenever it is asked to the user to take a selfie */
        {this.state.isCamera ? (<WebcamCapture takeSelfie={this.takeSelfie} />) : null}

        /**
        [NOT USED] SHARE MODAL
        Should be shown when 4 pictures are seen fullScreen (this.state.visited)
        change component's property "open" to "props.show" inside the component to use it */
        <Share
          deny={this.denyShare.bind(this)}
          share={this.shareExperience.bind(this)}
          show={(this.state.visited === 4 && this.state.askSharing)}
        />

        /**
        TOP BAR NAVIGATION
        condition : Shown if mosaic is not loading */
        {this.state.mosaicLoading ? "" : (
          <nav className="mainNav">
            <div className="btn_back navbar-left">
              <a onClick={this.previous.bind(this)} className="btn btn__secondary"><i className="fas fa-chevron-left"></i></a>
            </div>
            {!validBrowser ? "" : (
              <div className="navbar-right">
                <a onClick={this.openCamera} id="openCamera" className="btn btn__secondary"><i className="fas fa-camera"></i></a>
              </div>
            )}
          </nav>
        )}

        /**
        MAIN CONTENT
         */
        <div className="fullBG flex flex-col " id="game">
          <main className="flex justify-center relative">
            {!this.state.initialState ? (
              <Mosaic
                onClick={this.clickedCanvas.bind(this)}
                loadProgress={this.onLoadProgress.bind(this)}
                hidden={(this.state.showImage || this.state.mosaicLoading || this.state.isCamera)}
                height={this.state.dimensions.height}
                width={this.state.dimensions.width}
                target={this.state.selfie}
              />) : null}

            <CSSTransition in={(this.state.imgLoaded && !this.state.mosaicLoading && !this.state.selfie)} timeout={5000} classNames="desc-img">
              <div id="target" className={(this.state.mosaicLoading || !this.state.showImage) ? "hidden" : ""}>
                <img onLoad={this.handleImageLoaded.bind(this)} onClick={this.clickedImage.bind(this)} className="target" src={this.state.clickedTarget ? this.getImgSrc(this.state.clickedTarget) : this.state.selfie} ref={this.imgRef} alt="" />
              </div>
            </CSSTransition>

            <ImageDescription
              id={this.state.img_id}
              titre={this.state.img_title}
              auteur={this.state.img_author}
              date={this.state.img_date}
              lieu={this.state.img_place}
              show={(this.state.showImage && this.state.imgLoaded && !this.state.mosaicLoading)}
            />

          </main>
        </div>
      </div>
    );
  }
}

export default Game;
