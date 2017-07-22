import React, { Component } from 'react';
import NavHeader from './NavHeader';
import axios from 'axios';
import HeroGifBackground from './HeroGifBackground';

class Hero extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gifs: [],
      activeGif: 0
    }
  }
  componentDidMount() {
    const homePageGifQueryString = encodeURIComponent('fun music');
    
    axios(`/gifs?query=${homePageGifQueryString}`)
      .then((response) => {
        this.setState({
          gifs: response.data
        }, () => {
          this.gifRotatorInterval = setInterval(() => {
            this.setState({
              activeGif: this.state.activeGif < this.state.gifs.length - 1 ? this.state.activeGif + 1 : 0
            });
          }, 6000)
        });
      })
      .catch((err) => {
        console.error(err);
      })
  }
  componentWillUnmount() {
    clearInterval(this.gifRotatorInterval);
  }
  render() {
    return (
      <div className="hero">
        <HeroGifBackground 
          gifs={this.state.gifs} 
          activeGif={this.state.activeGif}
        />
        <NavHeader accessToken={this.props.accessToken} />
        <div className="hero__content">
          <h1 className="hero__title">{this.props.title}</h1>
        </div>
      </div>
    );
  }
}

export default Hero;