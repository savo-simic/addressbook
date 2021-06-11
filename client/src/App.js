// App.js file
import React, { Component } from "react";
import "./App.css";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

import {BrowserRouter as Router, Route, NavLink, Switch} from "react-router-dom";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Register from "./components/Register/Register";
import 'react-pro-sidebar/dist/css/styles.css';
import Navbar from "./components/Navbar";
import Countries from "./components/Countries/Countries";
import Cities from "./components/Cities/Cities";
import Professions from "./components/Professions/Professions";
import Agencies from "./components/Agencies/Agencies";
import Contacts from "./components/Contacts/Contacts";

export default class App extends Component {
  render() {
    let navLink = (
        <div className="Tab">
          <NavLink to="/login" activeClassName="activeLink" className="Login">
            Login
          </NavLink>
          <NavLink exact to="/" activeClassName="activeLink" className="Register">
            Register
          </NavLink>
        </div>
    );
    const login = localStorage.getItem("isLoggedIn");

    return (
        <div className="App">
          {login ? (
              <Router>
                  <Route path="/login" component={Login}></Route>
                  <Navbar/>
                  <Switch>
                      <Route path="/home" component={Home} />
                      <Route path="/countries" component={Countries} />
                      <Route path="/cities" component={Cities} />
                      <Route path="/professions" component={Professions} />
                      <Route path="/agencies" component={Agencies} />
                      <Route path="/contacts" component={Contacts} />
                  </Switch>
              </Router>
          ) : (
              <Router>
                {/*{navLink}*/}
                <Route path="/login" component={Login}></Route>
                <Route path="/home" component={Home}></Route>

              </Router>
          )}
        </div>
    );
  }
}
