import React, { Component } from 'react';
import 'whatwg-fetch';

class Register extends Component {
  constructor(){
    super();
    this.state = {
      username: "",
      password: ""
      }

    };

  handleChange(e, input){
    if (input === 'E'){
      this.setState({
        username: e.target.value
      })
    } else if (input === 'P'){
      this.setState({
        password: e.target.value
      })
    }
  }

  register(){
    console.log('Register')
    fetch('http://127.0.0.1:5000/register', {
      method: 'POST',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
  }

  render(){
    const {username, password} = this.state
    return(
      <div>
        <h1> Register Page </h1>
        Username: <input type="email" value={username} className='username'
        onChange={(e) => this.handleChange(e, 'E')}></input>
        <br/>
        Password: <input type="password" value={password} className='password'
        onChange={(e) => this.handleChange(e, 'P')}></input>
        <br />
        <button type='submit' onClick={() => this.register()}>Register</button>
      </div>
    )
  }
}
export default Register;
