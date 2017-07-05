import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      accessToken: null
    }
  }

  componentDidMount() {
    // fetch('/users')
    //   .then((response) => response.json())
    //   .then((response) => {
    //     this.setState({
    //       message: response.message
    //     })
    //   })
  }

  spotifySignIn() {
    // console.log('spotifysignin');
    // spotifyApi.getMe()
    //   .then((data) => {
    //     console.log('yay', data);
    //   }).catch((e) => {
    //     console.log('nooo', e);
    //   });
    // fetch('/login')
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log('login response', response);
    //   });
  }

  render() {
    return (
      <div>
        Login screen!
        <a href="http://localhost:3001/login">Login</a>
      </div>
    );
  }
}

export default Login;