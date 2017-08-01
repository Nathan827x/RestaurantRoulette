import React, { Component } from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router';
import './navbar.css'

// <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
//   Library
// </Breadcrumb.Item>

class NavBar extends Component {
  render() {
    return (
      <div className="Navbar">
        <Breadcrumb className="directory">
           <Breadcrumb.Item>
             <Link to="/" onClick={console.log("Test")}> Restaurant Roulette </Link>
           </Breadcrumb.Item>
           <Breadcrumb.Item>
             Data
           </Breadcrumb.Item>
           <Breadcrumb.Item>
             <Link to='login'> Login </Link>
           </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  }
}

export default NavBar;
