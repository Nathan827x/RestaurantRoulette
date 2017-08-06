import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class Map extends Component {
  constructor(){
    super();
    this.state = {
      markers: []
    }
  }

  handleMapClick(event) {
    const nextMarkers = [
      ...this.state.markers,
      {
        position: event.latLng,
        defaultAnimation: 2,
        key: Date.now(), // Add a key property for: http://fb.me/react-warning-keys
      },
    ];
    this.setState({
      markers: nextMarkers,
    });
  }

  // Examples Marker
  // markers: [{
  // position: {
  //   lat: 30.2672,
  //   lng: -97.7431,
  // },
  // key: `Taiwan`,
  // defaultAnimation: 2,
  // }]

  render(){
    // const markers = this.props.markers || [];
    return(
      <div>
      map is not showing up for some reason
        <GoogleMap
          onClick={this.handleMapClick.bind(this)}
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
