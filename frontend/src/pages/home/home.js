import React, { Component } from 'react';
import 'whatwg-fetch';
// import { Favorites, Test } from '../fetch/fetch';
import Map from './map/map'
import './home.css'
// key=AIzaSyD-KvhfCHz8YbZguRazLIorA7RaTKksga0


class Home extends Component {
  constructor(){
    super();
    this.state = {
      location: '',
      restaurant_name: []
    }
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
        for (let i = 0; i < json.length; i++) {
          let joined = this.state.restaurant_name.concat(json[i]['restaurant_name']);

          this.setState({
            "restaurant_name": joined
          })
        }
        console.log(this.state.restaurant_name.splice(this.state.restaurant_name))
      })
      .catch((ex) =>  {
        console.log('parsing failed', ex)
      })
    }

  Location(event){
    this.setState({location: event.target.value});
  }

  handleSubmit(){
    console.log('This is submitted to get a request of location');
    console.log(this.state.location);
    console.log(this.state.restaurant_name)
  }

  render(){
    return(
      <div>
        <h1> Hi Home </h1>
        <h3> Below is information from api  </h3>
          {this.state.restaurant_name}
          <div className="SearchMap">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <label>
                Address:
                <input type="text" value={this.state.location} onChange={this.Location.bind(this)} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <div className="Map">
              <Map
                center={{ lat: 30.2672, lng: -97.7431 }}
                containerElement={<div style={{height: 100+'%'}} /> }
                mapElement={<div style={{height:100+'%'}} />}
                />
            </div>
          </div>
      </div>
    )
  }
}
export default Home;
