import React from 'react'
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import withScriptjs from "react-google-maps/lib/async/withScriptjs"

class Map extends React.Component{

  constructor(props){
    super(props)
    this.state = {
      markers: [],
      center: {
        lat: 40.7128,
        lng: -74.0059
      }
    }
  }

  componentWillReceiveProps(nextProps){
      this.setState({
        markers: [{
        position: {
          lat: nextProps.location.lat,
          lng: nextProps.location.lng,
        },
        key: Date.now(),
        defaultAnimation: 2,
      }]
    })
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.props.center.lat === nextProps.center.lat){
      return false
    }else{
      return true
    }
  }

  render(){
    const AsyncMap = withScriptjs(
      withGoogleMap(
        props => (
          <GoogleMap
            defaultZoom={this.props.zoom}
            defaultCenter={{ lat: this.props.center.lat, lng: this.props.center.lng }}
          >
          {this.state.markers.map((marker, index) => (
            <Marker {...marker}
            />
          )
        )}
          </GoogleMap>
        )
      )
    )
    var map
    if(this.props.center.lat !== undefined){
      map = <AsyncMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBK0dnnnYasY4DeTeeZ6DUenu-kGkimIOI"
        loadingElement={
          <div style={{ height: `100%` }} />
        }
        containerElement={
          <div style={{ height: this.props.height }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
      />
    }else{
      map = <div style={{height: this.props.height}} />
    }
    return(map)
  }
}

export default Map
