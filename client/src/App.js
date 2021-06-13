// App.js file
import React, { Component } from "react";
import "./App.css";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

import {BrowserRouter as Router, Route, NavLink, Switch, Redirect} from "react-router-dom";
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Register from "./components/Register/Register";
import 'react-pro-sidebar/dist/css/styles.css';
import Navbar from "./components/Navbar";
import Countries from "./components/Countries/Countries";
import Cities from "./components/Cities/Cities";
import Professions from "./components/Professions/Professions";
import Agencies from "./components/Agencies/Agencies";
import Contacts from "./components/Contacts/Contacts";
import Users from "./components/Users/Users";
import ContactView from "./components/ContactView/ContactView";

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
    const userRole = localStorage.getItem("userRole");
console.log(userRole);
    return (
        <div className="App">
          {login && userRole =="Administrator" ? (
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
                      <Route path="/users" component={Users} />
                  </Switch>
              </Router>
          ) : ''
          }
            {login && userRole =="Contact" ?
            (
                <Router>
                    {/*<Navbar/>*/}
                    <Switch>
                        <Route path="/login" component={Login}></Route>
                        <Route path="/home" component={ContactView}></Route>
                    </Switch>


                </Router>
            ) :''
            }
            {!login ? (
                <Router>
                <Redirect to={{ pathname: '/login'}} />
                    <Route path="/login" component={Login}></Route>


                </Router>) :''}
        </div>
    );
  }
}
