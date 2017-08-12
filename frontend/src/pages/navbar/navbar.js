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
                <li><a href="#">Page 2</a></li>
                <li><a href="#">Page 3</a></li>
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


      <div id="sidebar">
        <div className="inner">
            <section id="search" className="alt">
              <form method="post" action="#">
                <input type="text" name="query" id="query" placeholder="Search" />
              </form>
            </section>
            <nav id="menu">
              <header className="major">
                <h2>Menu</h2>
              </header>
              <ul>
                <li><Link to="/"> Restaurant Roulette </Link></li>
                <li><Link to='login'> Login </Link></li>
                <li><Link to='register'> Register </Link></li>
                <li><Link to='profile'> Profile </Link></li>
                </ul>
            </nav>
          </div>
        </div>
export default NavBar;
