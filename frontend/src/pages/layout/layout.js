import React, { Component } from 'react';
import NavBar from '../navbar/navbar'


class Layout extends Component {
  render(){
    return(
      <div>
        
        {this.props.children}
      </div>
    )
  }
}
export default Layout;
