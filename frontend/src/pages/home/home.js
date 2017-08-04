import React, { Component } from 'react';
import 'whatwg-fetch';
import { Favorites, Test } from '../fetch/fetch';
import Map from '../map/map'
// key=AIzaSyD-KvhfCHz8YbZguRazLIorA7RaTKksga0


class Home extends Component {
  constructor(){
    super();
    this.state = {}
  }


  componentWillMount() {
    // const fav = Favorites();
    // this.setState({
    //   restaurant_name: fav
    // })
    fetch('http://127.0.0.1:5000/favorites')
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        this.setState({
          "restaurant_name": json[0]['restaurant_name']
        })
      })
      .catch((ex) =>  {
        console.log('parsing failed', ex)
      })
    }

  render(){
    console.log(this.state.restaurant_name)
    return(
      <div>
        <h1> Hi Home </h1>
        <h3> Below is information from api  </h3>
          {this.state.restaurant_name}
          <Map
            center={{ lat: 30.2672, lng: -97.7431 }}
            containerElement={<div style={{height: 400+'px'}} /> }
            mapElement={<div style={{height:400+'px'}} />}
            />
      </div>
    )
  }
}
export default Home;
