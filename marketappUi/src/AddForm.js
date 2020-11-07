import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import ImageUpload from "./ImageUpload.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import {
  Link
} from "react-router-dom";
export default class AddForm extends Component {
  state = {
    selectedMake: this.props.makes[0],
    selectedRegion: this.props.regions[0],
    selectedType: {
      name: "default",
    },
    heading: "",
    productionYear: null,
    engineType: "DIZEL",
    engineCapacity: null,
    kw: null,
    km: null,
    owner:null,
    contactNumber: "",
    description: "",
    files: [null],
    price: null,
    shifterType: "RUCNI"
  };

  renderRegionsSelect = (region, index) => {
    return <option value={index}>{region.name}</option>;
  };
  renderMakesSelect = (make, index) => {
    return <option value={index}>{make.name}</option>;
  };
  renderTypesSelect = (type, index) => {
    return <option value={index}>{type.name}</option>;
  };
  getFile = (files) => {
    console.log("from addform");
    this.setState({ files }, () => console.log(this.state.files));
  };
  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.selectedRegion.name === "default"){
      alert("Morate odabrati županiju!");
      return;
    }
    var typeID = this.state.selectedType.id
    var regionID = this.state.selectedRegion.id

    var addObject = {
      location: regionID,
      carType: typeID,
      heading: this.state.heading,
      productionYear: this.state.productionYear,
      km: this.state.km,
      enginePowerInKw: this.state.kw,
      engineType: this.state.engineType,
      engineCapacity: this.state.engineCapacity,
      shifterType: this.state.shifterType,
      contactNumber: this.state.contactNumber,
      description: this.state.description,
      owner: this.state.owner,
      price: this.state.price
    };
    var addId = null;
    await axios
      .post(process.env.REACT_APP_API + `ads/`, addObject)
      .then((response) => {
        console.log(response);
        addId = response.data.id;
      });
    Array.from(this.state.files).forEach((file) => {
      let formData = new FormData();
      formData.append("imagePath", file, file.name);
      formData.append("advertisement", addId);
      axios.post(process.env.REACT_APP_API + `images/`, formData).then((response) => {
      });
    });
    window.location = "/"
  };
  render() {
    return (
      <div>
        <Link to="/"><div style={{float:"right", fontSize: 60, marginRight: 100, cursor: "pointer"}}><FontAwesomeIcon icon={faArrowLeft} color={"dodgerblue"} /></div></Link>
        <div style={{clear: "both"}}></div>
      <div style={{display: "flex", flexDirection: "column", width: "100%", justifyContent: "center", alignItems: "center", padding: 100}}>
      <form onSubmit={this.onSubmit} style={{width: "60%"}}>
        <h3> Osnovni podaci</h3>
        <hr />
        <Form.Group controlId="formBasic">
          <Form.Label>Naslov oglasa</Form.Label>
          <Form.Control
            type="text"
            placeholder="Naslov oglasa"
            maxLength="25"
            value={this.state.heading}
            onChange={(e) => this.setState({ heading: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicSelect">
          <Form.Label>Odaberite županiju</Form.Label>
          <select
            required
            className="form-control"
            onChange={async (e) => {
             await this.setState({
                selectedRegion: this.props.regions[e.target.value],
              } );
              console.log(this.state.selectedRegion)
            }}
          >
            <option value="undef">-</option>
            {this.props.regions.map(this.renderRegionsSelect)}
          </select>
          <Form.Text className="text-muted">Lokacija vozila</Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicSelect">
          <Form.Label>Odaberite marku vozila</Form.Label>
          <select
            required
            className="form-control"
            onChange={async (e) => {
              if (e.target.value !== "undef") {
                await this.setState({
                  selectedMake: this.props.makes[e.target.value],
                  selectedType: this.props.makes[e.target.value].types[0]
                });
                console.log(this.state.selectedMake, this.state.selectedType)
              }
            }}
          >
            <option value="undef">-</option>
            {this.props.makes.map(this.renderMakesSelect)}
          </select>
          <Form.Text className="text-muted">
            Nakon odabira marke, prikazat će se modeli vozila u polju ispod.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicSelect">
          <Form.Label>Odaberite model vozila</Form.Label>
          <select
            required
            className="form-control"
            onChange={async (e) => {
             await this.setState({
                selectedType: this.state.selectedMake.types[e.target.value],
              });
              console.log(this.state.selectedType);
            }}
          >
            {this.state.selectedMake.types.map(this.renderTypesSelect)}
          </select>
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Label>Godina proizvodnje</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Godina proizvodnje"
            value={this.state.productionYear}
            onChange={(e) => this.setState({ productionYear: e.target.value }, console.log(this.state.productionYear))}
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Label>Motor</Form.Label>
          <select
            required
            className="form-control"
            value={this.state.engineType}
            onChange={(e) => this.setState({ engineType: e.target.value })}
          >
            <option value="DIZEL">Dizel</option>
            <option value="BENZIN">Benzin</option>
            <option value="BENZIN+LPG">Benzin + plin</option>
          </select>
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Label>Mjenjač</Form.Label>
          <select
            required
            className="form-control"
            value={this.state.shifterType}
            onChange={(e) => this.setState({ shifterType: e.target.value })}
          >
            <option value="RUCNI">Ručni</option>
            <option value="AUTOMATSKI">Automatski</option>
          </select>
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Label>Zapremnina motora (kubika)</Form.Label>
          <Form.Control
            required
            min="1"
            type="number"
            placeholder="Radni obujam u ccm3"
            value={this.state.engineCapacity}
            onChange={(e) => this.setState({ engineCapacity: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Label>Snaga u kilovatima</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Snaga u kW"
            min="1"
            value={this.state.kw}
            onChange={(e) => this.setState({ kw: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Label> Prijeđeni kilometri</Form.Label>
          <Form.Control
            required
            min="1"
            type="number"
            placeholder="Prijeđeni kilometri"
            value={this.state.km}
            onChange={(e) => this.setState({ km: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Label>Vlasnik</Form.Label>
          <Form.Control
            required
            type="number"
            min="1"
            placeholder="Vlasnik"
            value={this.state.owner}
            onChange={(e) => this.setState({ owner: e.target.value })}
          />
          <Form.Text className="text-muted">
            Odnosi se na broj, 1. vlasnik je onaj koji je kupio vozilo iz
            salona.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Label>Opis</Form.Label>
          <textarea
            required
            className="form-control"
            placeholder="Opišite vozilo"
            maxLength="500"
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
          ></textarea>
        </Form.Group>

        <Form.Group controlId="formBasicTelephone">
          <Form.Label>Kontakt broj</Form.Label>
          <Form.Control
            required
            type="text"
            maxsize="20"
            placeholder="Broj mobitela"
            value={this.state.contactNumber}
            onChange={(e) => this.setState({ contactNumber: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Label>Cjena u HRK</Form.Label>
          <Form.Control
            required
            type="number"
            min="1"
            placeholder="HRK"
            value={this.state.price}
            onChange={(e) => this.setState({ price: e.target.value })}
          />
        </Form.Group>
        <br></br>
        <h3> Fotografije </h3>
        <hr />
        <ImageUpload passFiles={this.getFile.bind(this)} />
        <Button variant="btn btn-primary w-100" type="submit">
          Submit
        </Button>
      </form>
      </div>
      </div>
    );
  }
}
