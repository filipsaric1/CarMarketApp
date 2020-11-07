import React, { Component } from 'react'
import AddList from "./AddList.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import Advertisement from "./Advertisement.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
export default class Header extends Component {
    render() {
        return (
            <div>
              <div className="header">
                <div className="flex-1"><FontAwesomeIcon icon={faCar} /></div>
                <div className="flex-2"> <Link to="/add"><button className="btn btn-primary">+ Objavi oglas</button></Link></div>
              </div>
              
            </div>
        )
    }
}
