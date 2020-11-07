import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
export default class SearchAds extends Component {
  state = {
    selectedMake: null,
    selectedRegion: null,
    selectedType: null,
    minYear: null,
    maxYear: null,
    maxPrice: null,
    minPrice: null,
    shifterType: null,
    engineType: null,
    maxKm: null,
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
  onClick = (e) => {
      e.preventDefault()
      let queryString = ""
      if (this.state.selectedMake){
        queryString += "make=" + this.state.selectedMake.id.toString() + "&"
      }
      if (this.state.selectedRegion){
        queryString += "location=" + this.state.selectedRegion.id.toString() + "&"
      }
      if (this.state.selectedType){
        queryString += "carType=" + this.state.selectedType.id.toString() + "&"
      }
      if (this.state.shifterType) {
        queryString += "shifterType=" + this.state.shifterType.toString() + "&"
      }
      if (this.state.engineType) {
        queryString += "engineType=" + this.state.engineType.toString() + "&"
      }
      if (this.state.minYear) {
        queryString += "minYear=" + this.state.minYear.toString() + "&"
      }
      if (this.state.maxYear) {
        queryString += "maxYear=" + this.state.maxYear.toString() + "&"
      }
      if (this.state.minKm) {
        queryString += "minKm=" + this.state.minKm.toString() + "&"
      }
      if (this.state.maxKm) {
        queryString += "maxKm=" + this.state.maxKm.toString() + "&"
      }
      if (this.state.minPrice) {
        queryString += "minPrice=" + this.state.minPrice.toString() + "&"
      }
      if (this.state.maxPrice) {
        queryString += "maxPrice=" + this.state.maxPrice.toString() + "&"
      }
      this.props.passQueryString(queryString)
      
        
  }
  render() {
    return (
      <div style={{ width: "85%" }}>
        <form>
          <Form.Group controlId="formBasicSelect">
            <Form.Label>Odaberite županiju</Form.Label>
            <select
              required
              className="form-control"
              onChange={async (e) => {
                  if (e.target.value === "undef"){
                    await this.setState({
                        selectedRegion: null,
                      });
                  }
                  else {
                    await this.setState({
                        selectedRegion: this.props.regions[e.target.value],
                      });

                  }
                
                console.log(this.state.selectedRegion);
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
              className="form-control"
              onChange={async (e) => {
                if (e.target.value !== "undef") {
                    await this.setState({
                        selectedMake: this.props.makes[e.target.value],
                      });
                  
                }
                else {
                    await this.setState({
                        selectedMake: null,
                        selectedType: null,
                      });

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
              className="form-control"
              onChange={async (e) => {

                  if (e.target.value !== "undef"){
                      var value=this.state.selectedMake.types[e.target.value]
                      await this.setState({
                        selectedType: value,
                      });
                  }
                  else {
                    await this.setState({
                        selectedType: null,
                      });

                  }
                
                console.log(this.state.selectedType);
              }}
            >
              <option value="undef">-</option>
              {this.state.selectedMake ? this.state.selectedMake.types.map(this.renderTypesSelect): null}
            </select>
          </Form.Group>
          <div className="form-group">
            <Form.Label>Godina proizvodnje</Form.Label>
            <div class="row">
              <div class="col">
                <input
                  class="form-control"
                  type="number"
                  min="1800"
                  placeholder="Od"
                  value={this.state.minYear}
                  onChange={(e) =>
                    this.setState(
                      { minYear: e.target.value },
                      console.log(this.state.minYear)
                    )
                  }
                />
              </div>
              <div class="col">
                <input
                  class="form-control"
                  type="number"
                  placeholder="Do"
                  max="2021"
                  value={this.state.maxYear}
                  onChange={(e) =>
                    this.setState(
                      { maxYear: e.target.value },
                      console.log(this.state.maxYear)
                    )
                  }
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <Form.Label>Cijena u HRK</Form.Label>
            <div class="row">
              <div class="col">
                <input
                  class="form-control"
                  type="number"
                  placeholder="Od"
                  value={this.state.minPrice}
                  onChange={(e) =>
                    this.setState(
                      { minPrice: e.target.value },
                      console.log(this.state.minPrice)
                    )
                  }
                />
              </div>
              <div class="col">
                <input
                  class="form-control"
                  type="number"
                  placeholder="Do"
                  value={this.state.maxPrice}
                  onChange={(e) =>
                    this.setState(
                      { maxPrice: e.target.value },
                      console.log(this.state.maxPrice)
                    )
                  }
                />
              </div>
            </div>
          </div>
          <Form.Group controlId="formBasic">
          <Form.Label>Motor</Form.Label>
          <select
            required
            className="form-control"
            value={this.state.engineType}
            onChange={(e) => {
                if (e.target.value === "undef"){
                    this.setState({ engineType: null})
                }
                else {
                    this.setState({engineType: e.target.value})
                }
            }}
          >
            <option value="undef">-</option>
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
            onChange={(e) => {
                if (e.target.value === "undef"){
                    this.setState({ shifterType: null})
                }
                else {
                    this.setState({shifterType: e.target.value})
                }
                
            }}
          >
              <option value="undef">-</option>
            <option value="RUCNI">Ručni</option>
            <option value="AUTOMATSKI">Automatski</option>
          </select>
        </Form.Group>
        <Form.Group controlId="formBasic">
          <Form.Label>Kilometara (maksimum)</Form.Label>
          <Form.Control
            required
            type="number"
            min="0"
            placeholder="Do"
            value={this.state.maxKm}
            onChange={(e) => this.setState({ maxKm: e.target.value })}
          />
          
        </Form.Group>
        <Button variant="btn btn-primary w-100" type="submit" onClick={this.onClick}> 
          Pretraga
        </Button>
        </form>
      </div>
    );
  }
}
