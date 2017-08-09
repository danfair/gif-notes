import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    return null;
  }

  render() {
    return (
      <div className="hero__bg">
        {this.props.gifs.map((gif, index) => {
          const statusClassName = this.getStatusClassName(index);
          return (
            <div
              key={gif.id}
              className={`hero__bg-img ${statusClassName}`}
              style={statusClassName === 'active-gif' || statusClassName === 'prev-gif' ? { backgroundImage: `url(${gif.images.original.url})` } : {}}
            />
          );
        })}
        <div className="hero__bg-overlay" />
      </div>
    );
  }
}

HeroGifBackground.propTypes = {
  activeGif: PropTypes.number.isRequired,
  gifs: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HeroGifBackground;
