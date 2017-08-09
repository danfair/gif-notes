import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Gif from './Gif';
import gifNotesLogo from '../img/gn_logo_bg.png';

class GifRotator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeGifIndex: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.transitionTime !== nextProps.transitionTime) {
      clearInterval(this.rotateGifInterval);

      this.rotateGifInterval = setInterval(() => {
        this.setState({
          activeGifIndex: this.state.activeGifIndex + 1,
        }, () => {
          if (this.state.activeGifIndex > this.props.gifQueryOffset - 5) {
            this.props.getMoreGifs();
          }
        });
      }, nextProps.transitionTime * 1000);
    }

    if (nextProps.resetActiveGif) {
      this.setState({
        activeGifIndex: 0,
      }, () => {
        this.props.clearResetActiveGif();
      });
    }
  }

  render() {
    return (
      <div className="gif-rotator">
        {this.props.isPlaying &&
          <div className="gif-rotator__bg">
            <img src={gifNotesLogo} alt="" />
          </div>
        }
        {this.props.gifs.length > 0 && this.props.gifs.map((gif, index) => {
          return (
            <Gif
              activeGifIndex={this.state.activeGifIndex}
              gifObject={gif}
              gifId={index}
              key={gif.id}
            />
          );
        })}
      </div>
    );
  }
}

GifRotator.propTypes = {
  clearResetActiveGif: PropTypes.func.isRequired,
  getMoreGifs: PropTypes.func.isRequired,
  gifs: PropTypes.arrayOf(PropTypes.object), // eslint-disable-line 
  gifQueryOffset: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool,
  resetActiveGif: PropTypes.bool.isRequired,
  transitionTime: PropTypes.number,
};

GifRotator.defaultProps = {
  isPlaying: true,
  transitionTime: 0,
};

export default GifRotator;
