import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class Map extends Component {
  constructor(){
    super();
    this.state = {
      markers: []
    }
  }

  mouseClick(){
    console.log('mouse click')
  }

  mapLoaded(){
    console.log('loaded')
    this.setState({
      markers: [{
      position: {
        lat: 30.2672,
        lng: -97.7431,
      },
      key: `Taiwan`,
      defaultAnimation: 2,
      }]
    })
  }

  render(){
    // const markers = this.props.markers || [];
    return(
      <div>
      map is not showing up for some reason
        <GoogleMap
          ref={this.mapLoaded.bind(this)}
          onClick={this.mouseClick.bind(this)}
          defaultZoom={12}
          defaultCenter={this.props.center} >
          {this.state.markers.map((marker, index) => (
            <Marker {...marker} />
          )
        )}
        </GoogleMap>
      </div>
    )
  }
}

export default withGoogleMap(Map);
