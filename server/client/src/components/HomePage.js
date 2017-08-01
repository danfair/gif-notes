import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Hero from './Hero';
import CardRow from './CardRow';
import Footer from './Footer';
import frontPageData from '../data/frontPage';

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
    return (
      <div className="login-page">
        <Hero
          title={frontPageData.title}
          accessToken={this.state.accessToken}
        />
        <CardRow
          cards={frontPageData.cardData}
        />
        <Footer />
      </div>
    );
  }
}

export default Login;