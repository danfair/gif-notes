import React, { Component } from 'react';
import NavHeader from './NavHeader';
import axios from 'axios';
import queryString from 'query-string';
import HeroGifBackground from './HeroGifBackground';



class Hero extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gifs: [],
      activeGif: 0,
      isFourOhFour: false
    }
  }
  componentDidMount() {
    const queryParams = queryString.parse(window.location.search);
    if (queryParams.fail) {
      this.setState({
        isFourOhFour: true
      });
    }

    const searchTerm = queryParams.fail ? 'fail' : 'music dance';
    const homePageGifQueryString = encodeURIComponent(searchTerm);
    
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
        console.error('hero componentDidMount error:', err);
      })
  }

  componentWillUnmount() {
    clearInterval(this.gifRotatorInterval);
  }
  
  render() {
    return (
      <div className="hero" style={this.state.isFourOhFour ? {backgroundImage: `url(https://media.giphy.com/media/AAnIjZPUhrUM8/giphy.gif)`} : {}}>
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

export default Hero;