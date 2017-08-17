import React, { Component } from 'react';
// import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router';
import './navbar.css'

class NavBar extends Component {
  
  render() {
    return (
      <div id="menu">
        <nav className="navbar navbar-deault navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="nav navbar-nav">
                <li><Link to="/" >Restaurant Roulette</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to='login'> Login </Link></li>
                <li><Link to='register'> Register </Link></li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
