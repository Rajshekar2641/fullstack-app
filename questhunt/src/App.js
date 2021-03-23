import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateLocation from "./components/create-location.component";
import EditLocation from "./components/edit-location.component";
import LocationsList from "./components/locations-list.component";
import MainComponent from "./components/main-color-app.component";
import DeleteLocation from "./components/delete-location.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Quest Hunt</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/locations" className="nav-link">Locations</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/addlocation" className="nav-link">Add Location</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Route path ="/" exact component = {MainComponent}/>
          <Route path="/locations" component={LocationsList} />
          <Route path="/edit/:id" component={EditLocation} />
          <Route path="/addlocation" component={CreateLocation} />
          <Route path="/delete/:id" component = {DeleteLocation} />
        </div>
      </Router>
    );
  }
}

export default App;