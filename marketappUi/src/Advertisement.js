import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Gallery from "./Gallery";
export default class Advertisement extends Component {
  state = {
    advertisement: null,
  };
  componentDidMount = () => {
    const {
      match: { params },
    } = this.props;
    axios
      .get(process.env.REACT_APP_API + `adsRead/${params.advId}`)
      .then(({ data: advertisement }) => {
        console.log(advertisement);
        this.setState({ advertisement });
      });
  };
  render() {
    return this.state.advertisement ? (
      <div>
        <div
          style={{
            float: "right",
            fontSize: 60,
            marginRight: 100,
            cursor: "pointer",
          }}
        >
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft} color={"dodgerblue"} />
          </Link>{" "}
        </div>
        <div style={{ clear: "both" }}></div>

        <div className="d-flex justify-content-center" style={{marginBottom: 30}}>
          <div className="card resp">
            {<Gallery images={this.state.advertisement.images} />}
            <div className="" style={{padding: 16}}>
              <h5 className="card-title">
                <b>{this.state.advertisement.heading}</b>
              </h5>
              <p>{this.state.advertisement.description}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Županija: <b>{this.state.advertisement.location.name}</b>
              </li>
              <li className="list-group-item">
                Marka vozila:{" "}
                <b>{this.state.advertisement.carType.make.name}</b>
              </li>
              <li className="list-group-item">
                Model vozila: <b>{this.state.advertisement.carType.name}</b>
              </li>
              <li className="list-group-item">
                Kilometara prijeđeno: <b>{this.state.advertisement.km}</b>
              </li>
              <li className="list-group-item">
                Godina proizvodnje:{" "}
                <b>{this.state.advertisement.productionYear}</b>
              </li>
              <li className="list-group-item">
                Motor: <b>{this.state.advertisement.engineType}</b>
              </li>
              <li className="list-group-item">
                Mjenjač: <b>{this.state.advertisement.shifterType}</b>
              </li>
              <li className="list-group-item">
                Snaga u kW: <b>{this.state.advertisement.enginePowerInKw}</b>
              </li>
              <li className="list-group-item">
                Zapremnina motora (ccm3): <b>{this.state.advertisement.engineCapacity}</b>
              </li>
              <li className="list-group-item">
                Vlasnik: <b>{this.state.advertisement.owner}</b>
              </li>
              <li className="list-group-item">
                Kontakt broj: <b>{this.state.advertisement.contactNumber}</b>
              </li>
            </ul>
            <div className="card-body">
        Cijena: <b>{this.state.advertisement.price} {"KN"}</b>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}
