import React, { Component } from 'react';
import NavHeader from './NavHeader';
import axios from 'axios';
import bgImage from '../img/how_i_taught_ya.png';

class Hero extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      gifs: []
    }
  }
  componentDidMount() {
    const homePageGifQueryString = encodeURIComponent('fun yay');
    
    axios(`/gifs?${homePageGifQueryString}`)
      .then((response) => {
        this.setState({
          gifs: response.data
        });
      })
      .catch((err) => {
        console.error(err);
      })
  }
  render() {
    return (
      <div className="hero">
        <NavHeader />
        <div className="hero__content">
          <h1 className="hero__title">{this.props.title}</h1>
        </div>
      </div>
    );
  }
}

export default Hero;