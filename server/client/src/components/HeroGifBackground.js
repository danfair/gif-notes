import React, { Component } from 'react';

class HeroGifBackground extends Component {
  constructor(props) {
    super(props);
    this.getStatusClassName = this.getStatusClassName.bind(this);
  }
  getStatusClassName(index) {
    if (index === this.props.activeGif) {
      return 'active-gif';
    } else if (index === this.props.activeGif - 1) {
      return 'prev-gif';
    } else if (index === 24 && this.props.activeGif === 0) {
      return 'prev-gif';
    }
  }

  render() {
    return (
      <div className="hero__bg">
        {this.props.gifs.map((gif, index) => {
          let statusClassName = this.getStatusClassName(index);

          return <div key={index} className={`hero__bg-img ${statusClassName}`} style={{backgroundImage: `url(${gif.images.original.url})`}}></div>
        })}
        <div className="hero__bg-overlay"></div>
      </div>
    );
  }
}

export default HeroGifBackground;