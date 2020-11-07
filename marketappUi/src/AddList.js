import React, { Component } from "react";
import SearchAds from "./SearchAds.js";
import {Link} from 'react-router-dom';
export default class AddList extends Component {
  renderAdv = (adv, index) => {
    let imageExists = true ? adv.images[0] != null : false;
    return (
      <Link style={{textDecoration: "none", color:"inherit"}} to={`/advertisement/${adv.id}`}>
      <div className="card" id="card-1" style={{ marginTop: 20, cursor: "pointer" , paddingBottom: 30 }}>
        <img
          className="card-img-top"
          src={
            imageExists
              ? adv.images[0].imagePath
              : "data:image/jpeg;base64,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"
          }
          alt="IMG"
          style={{ width: "100%", height: 350 }}
        />
        <div className="card-body">
          <h5 className="card-title"><b>{adv.heading}</b></h5>
          <p className="card-text">
            <p>
              Marka i model: <b></b>
        <b>{adv.carType.make.name} {" "}</b>
              <b>{adv.carType.name}</b>
        <b>{", "}{adv.km} {"km"}</b>
            </p>
            <p>
              Godište: <b></b>
              <b>{adv.productionYear}</b>
            </p>
            <p>
              Lokacija: <b></b>
              <b>{adv.location.name}</b>
            </p>
            
          </p>
        <h3 style={{float: "right"}}>{adv.price} {"kn"}</h3>
        <div style={{clear: "both"}}></div>
        </div>
      </div>
      </Link>
    );
  };
  render() {
    if (this.props.ads !== null) {
      return (
        <div className="flex-container">
          <div className="filter">
            <h5 className="h-5 ml-4 mt-3">Filter oglasa</h5>
            <div className="list-container">
              <SearchAds regions={this.props.regions} makes={this.props.makes} types={this.props.types} passQueryString={this.props.passQueryString} />
            </div>
            
          </div>
          <div className="ads">
            <h5 className="ml-5 mt-3"> Rezultati pretrage</h5>
            <div className="list-container">
              <div className="adsList">
                {this.props.ads.map(this.renderAdv)}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
