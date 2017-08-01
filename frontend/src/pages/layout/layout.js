import React, { Component } from 'react';
import NavBar from '../navbar/navbar'


class Layout extends Component {
  render(){
    return(
      <div>
        <NavBar></NavBar>
        {this.props.children}
      </div>
    )
  }
}
export default Layout;
