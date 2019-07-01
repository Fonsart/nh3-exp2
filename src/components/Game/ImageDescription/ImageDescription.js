/* eslint-disable */

import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import './ImageDescription.css';
import Div100vh from 'react-div-100vh'

class ImageDescription extends Component {


    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            location: '',
            author: '',
            id: '',
            width:0,
            height:0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentWillMount() {
        this.updateWindowDimensions();
        this.getImageDescription(this.props.location.state.imageName)
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentDidMount(){
        this.setState({ mounted: true });
        const height = this.divElement;
        console.log(height)
    }

    async getImageDescription(imageName){
        try {
            const response = await fetch(`https://lab.notrehistoire.ch/exp2/api/images-info/${imageName}`);
            const responseJson = await response.json();
            const info = responseJson.info;
            this.setState({
                title: info.titre,
                date: `${info.date.day}/${info.date.month}/${info.date.year}`,
                location: info.location,
                author: info.author,
                id: info.id,
                width: info.media.width > this.state.width ? this.state.width : info.media.width,
                height: info.media.height/(info.media.width/this.state.width)
            })
        } catch (err) {
            console.log(err)
        }
    }

    render() {

        return (
            
            <CSSTransition in={(this.state.mounted)} timeout={500} classNames="desc-node" unmountOnExit>
                <Div100vh>
                    <div className='image-description'>
                        <div className="image">
                            <img src={`https://lab.notrehistoire.ch/exp2/api/raw-images/${this.props.location.state.imageName}`} width={this.state.width} height={this.state.height}/>,
                        </div>
                        <div className="description"
                            ref={ (divElement) => this.divElement = divElement}
                        >
                            <nav className="mainNav">
                                <div className="btn_back navbar-left">
                                    <a onClick={() => this.props.history.goBack()} className="btn btn__secondary"><i className="fas fa-chevron-left"></i></a>
                                </div>
                                <div className="navbar-right">
                                    <a onClick={() => this.props.history.push('/selfie')} id="openCamera" className="btn btn__secondary"><i className="fas fa-camera"></i></a>
                                </div>
                            </nav>
                            <div className='info'>
                                <h2>{this.state.title}</h2>
                                <h3>{this.state.date} {this.state.location != '' ? "- " + this.state.location :null}</h3>
                                <p>Auteur·e : {this.state.author}</p>
                                <a href={"https://www.notrehistoire.ch/medias/" + this.state.id} target="_blank">Voir sur notreHistoire.ch</a>
                            </div>
                        </div>
                    </div>
                </Div100vh>
            </CSSTransition>
        )
    }

}

export default ImageDescription;
