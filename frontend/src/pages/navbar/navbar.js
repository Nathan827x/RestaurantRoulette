import React, { Component } from 'react';
// import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router';
import './navbar.css'

// <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
//   Library
// </Breadcrumb.Item>
// <Breadcrumb className="Navbar">
//    <Breadcrumb.Item>
//      <Link to="/" onClick={console.log("Test")}> Restaurant Roulette </Link>
//    </Breadcrumb.Item>
//    <Breadcrumb.Item>
//      <Link to='login'> Login </Link>
//    </Breadcrumb.Item>
// </Breadcrumb>

class NavBar extends Component {
  render() {
    return (
      <div className="Navbar">
        <nav className="navbar navbar-default">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/"> Restaurant Roulette </Link>
          </div>
          <ul className="nav navbar-nav">
            <li>
             <Link to='login'> Login </Link>
            </li>
            <li>
             <Link to='register'> Register </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default NavBar;
