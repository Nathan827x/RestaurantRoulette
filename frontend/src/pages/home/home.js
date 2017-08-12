import React, { Component } from 'react';
import 'whatwg-fetch';
// import { Favorites, Test } from '../fetch/fetch';
import { Link } from 'react-router';
import Map from './map/map'
import './home.css'

class Home extends Component {
  constructor(){
    super();
    this.state = {
      query: "",
      restaurant_name: "",
      phone: "",
      address: "",
      location: "",
      center: {
        lat: 40.7128,
        lng: -74.0059
      }
    }
  }

  Location(event){
    this.setState({query: event.target.value});
  }

  handleSubmit(){
    const {query} = this.state
    console.log('This is submitted to get a request of location')
    fetch('http://127.0.0.1:5000/maps?location=' + query)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      //   let joined = restaurant_name.concat(json[0]['restaurant_name']);
      this.setState({
        restaurant_name: json.name,
        phone: json.phone,
        address: json.address,
        location: json.location,
        center: {
          lat: json.location.lat,
          lng: json.location.lng
        }
      })
    })
    .catch((ex) =>  {
      console.log('parsing failed', ex)
    })
  }

  render(){
    const {query, restaurant_name, phone, address, center} = this.state
    // console.log(center)
    // console.log(location)
    return(
      <div id="main">
        <div className="inner">
          <header id="header">
            <Link to="/" className="logo"><strong>Restaurant Roulette</strong></Link>
          </header>
          <section id="banner">
            <div className="content">
              <header>
                <h1>Find YOUR New Place To Eat!</h1>
              </header>
              <div className="Information">
                Restaurant Name: {restaurant_name} <br/>
                Address: {address} <br />
                phone: {phone}
              </div>
              <br />
              <p>Not sure what to eat? <br/>
                Go ahead and try a new place!</p>
            </div>
            <div className="image object">
              <form className="SearchMap" onSubmit={this.handleSubmit.bind(this)}>
                <label className="SearchQuery">
                  <input className="form-control" type="text" placeholder="Search a location"
                  value={query} onChange={(e) => this.Location(e)} />
                </label>
                <button className="btn" type="submit"  >Time to Eat! </button>
              </form>
                <Map
                center={center}
                location={center}
                height='100%'
                zoom={14}
                />
          </div>
        </section>
      </div>
    </div>
    )
  }
}
export default Home;
