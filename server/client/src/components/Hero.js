import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import queryString from 'query-string';

import NavHeader from './NavHeader';
import HeroGifBackground from './HeroGifBackground';
import starterGif from '../data/starterGif';


class Hero extends Component {
  constructor(props) {
    super(props);

    const queryParams = queryString.parse(window.location.search); // eslint-disable-line

    this.state = {
      gifs: [starterGif],
      activeGif: 0,
      isFourOhFour: queryParams.fail,
    };
  }

  componentDidMount() {
    const searchTerm = this.state.isFourOhFour ? 'fail' : 'fun music';
    const homePageGifQueryString = encodeURIComponent(searchTerm);

    axios(`/gifs?query=${homePageGifQueryString}`)
      .then((response) => {
        this.setState({
          gifs: this.state.gifs.concat(response.data),
        }, () => {
          this.gifRotatorInterval = setInterval(() => {
            this.setState({
              activeGif: this.state.activeGif < this.state.gifs.length - 1 ? this.state.activeGif + 1 : 0,
            });
          }, 6000);
        });
      })
      .catch((err) => {
        console.error('hero componentDidMount error:', err);
      });
  }

  componentWillUnmount() {
    clearInterval(this.gifRotatorInterval);
  }

  render() {
    return (
      <div className="hero" style={this.state.isFourOhFour ? { backgroundImage: 'url(https://media.giphy.com/media/AAnIjZPUhrUM8/giphy.gif)' } : {}}>
        <HeroGifBackground
          gifs={this.state.gifs}
          activeGif={this.state.activeGif}
        />
        <NavHeader accessToken={this.props.accessToken} />
        <div className="hero__content">
          <h1 className="hero__title">{this.state.isFourOhFour ? '404 Fail! This isn\'t hard. Follow the directions below:' : this.props.title}</h1>
        </div>
      </div>
    );
  }
}

Hero.propTypes = {
  accessToken: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Hero;
