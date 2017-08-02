import React, { Component } from 'react';
import 'whatwg-fetch';

class Home extends Component {
  constructor(){
    super();
    this.state = {}
  }

  componentDidMount() {
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

    return(
      <div>
        <h1> Hi Home </h1>
        <h3> Below is information from api  </h3>
          {this.state.restaurant_name}

      </div>
    )
  }
}
export default Home;
