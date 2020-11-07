import React, { Component } from 'react'
import ImageGallery from 'react-image-gallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

import {
  Link
} from "react-router-dom";
export default class Gallery extends Component {
    state = {
        selectedImage: null
    }
    images = []
    selectedIndex = 0
    numberOfImages = null
    constructor(props) {
        super(props);
        this.props.images.map((image) => {
            return this.images.push(image.imagePath)
        })
        this.state.selectedImage = this.images[0]
        this.numberOfImages = this.images.length;
    }
    next = () => {
        console.log(this.selectedIndex)
        if (this.selectedIndex === this.numberOfImages - 1) {
            this.selectedIndex = 0
        }
        else {
            this.selectedIndex += 1
        }
        this.setState({selectedImage: this.images[this.selectedIndex]})
        console.log(this.state.selectedImage)
    }
    previous = () => {
        if (this.selectedIndex === 0) {
            this.selectedIndex = this.numberOfImages - 1
        }
        else {
            this.selectedIndex -= 1
        }
        this.setState({selectedImage: this.images[this.selectedIndex]})
        
    }
    render() {
        let current = this.state.selectedImage
        return (<div style={{width: "100%", height: "70%"}} >
            <img src={current} style={{width: "100%", height: "600px", cursor:"pointer"}} onClick={this.next}/>
            <div style={{display: "flex", flex: 1, flexDirection: "row", justifyContent:"space-between",alignItems:"center", paddingLeft: 10, paddingRight: 10, borderBottom: "2px solid dodgerblue", borderTop:"1px solid dodgerblue"}}>
                <div><div onClick={this.previous} style={{fontSize: 60, cursor: "pointer" }}><FontAwesomeIcon icon={faArrowLeft} color="dodgerblue"/> </div></div>
    <div style={{color: "dodgerblue", fontSize: 20}}>{this.selectedIndex + 1} / {this.numberOfImages}</div>
                <div><div onClick={this.next} style={{fontSize: 60, cursor:"pointer"}}><FontAwesomeIcon icon={faArrowRight} color="dodgerblue"/> </div></div>
                
                
            </div>
            
        </div>)
    }
}
