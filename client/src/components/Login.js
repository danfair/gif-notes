import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      accessToken: null,
      refreshToken: null
    };
  }

  componentDidMount() {
    this.setState({
      accessToken: cookies.get('gn_at'),
      refreshToken: cookies.get('gn_rt')
    });
  }

  render() {
    if (this.state.accessToken && this.state.refreshToken) {
      return <Redirect push to="/player" />
    }

    return (
      <div>
        Login screen!
        <a href="http://localhost:3001/login">Login</a>
      </div>
    );
  }
}

export default Login;