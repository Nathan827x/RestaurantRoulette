import React, { Component } from 'react';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  render(){
    return(
      <div>
        <h1> Login Page </h1>
      </div>
    )
  }
}
export default Login;
