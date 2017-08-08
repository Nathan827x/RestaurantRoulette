import React, { Component } from 'react';
import 'whatwg-fetch';

class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: "",
      password: ""
    }
  }

  Login(event, input){
    if (input === 'U'){
      this.setState({
        username: event.target.value
      })
    } else if (input === 'P'){
      this.setState({
        password: event.target.value
      })
    }
  }

  handleSubmit(){
    console.log('Login')
    fetch('http://127.0.0.1:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then((res) => {
      console.log(res)
      return res.json() })

    .then((json) => {
      console.log(json)
    })

    .catch((err) => { console.log(err) })
  }

  render(){
    const {username, password} = this.state
    return(
      <div>
        <h1> Login Page </h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => this.Login(e, 'U')} />
            <br />
            Password:
            <input type='password' value={password} onChange={(e) => this.Login(e, 'P')} />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
export default Login;
