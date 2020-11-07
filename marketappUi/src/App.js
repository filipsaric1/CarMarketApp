import "./App.css";
import React, { Component } from "react";
import axios from "axios";
import AddForm from "./AddForm.js";
import AddList from "./AddList.js";
import Header from "./Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import Advertisement from "./Advertisement.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default class App extends Component {
  responseSuccess = true;
  state = {
    makes: [
      {
        name: "defalut",
        types: [],
      },
    ],
    regions: [
      {
        name: "default",
      },
    ],
    ads: [],
    types: [{ id: 0, name: "name" }],
  };
  componentDidMount = () => {
    try {
      axios.get(process.env.REACT_APP_API + `regionsBasic/`).then((res) => {
        const regions = res.data;
        this.setState({ regions });
      });
      axios.get( process.env.REACT_APP_API + `makes/`).then((res) => {
        const makes = res.data;
        this.setState({ makes });
      });
      
      axios.get( process.env.REACT_APP_API +`types/`).then((res) => {
        const types = res.data;
        this.setState({ types });
      });
    } catch (error) {
      this.responseSuccess = false;
    }
  };
  query = (queryString) => {
    queryString = queryString.slice(0, -1)
    axios.get( process.env.REACT_APP_API + `adsRead/?` + queryString).then((res) => {
        const ads = res.data;
        this.setState({ ads });
      });
  }
  render() {
    return this.responseSuccess ? (
      <Router>
        <Switch>
          <Route exact path="/">
            <Header/>
            <div className="d-flex justify-content-center">
                <AddList
                  ads={this.state.ads}
                  types={this.state.types}
                  makes={this.state.makes}
                  regions={this.state.regions}
                  passQueryString={this.query}
                />
              </div>
          </Route>
          <Route path="/add">
            <AddForm makes={this.state.makes} regions={this.state.regions} />
          </Route>
          <Route path="/advertisement/:advId" component={Advertisement} />
        </Switch>
      </Router>
    ) : (
      <h1>There has been an error</h1>
    );
  }
}
