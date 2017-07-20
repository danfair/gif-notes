import React, { Component } from 'react';
import Gif from './Gif';

class GifRotator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeGifIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.transitionTime !== nextProps.transitionTime) {

      clearInterval(this.rotateGifInterval);

      this.rotateGifInterval = setInterval(() => {
        this.setState({
          activeGifIndex: this.state.activeGifIndex + 1
        }, () => {
          if (this.state.activeGifIndex > this.props.gifQueryOffset - 5) {
            this.props.getMoreGifs();
          }
        });
      }, nextProps.transitionTime * 1000);
    }

    if (nextProps.resetActiveGif) {
      this.setState({
        activeGifIndex: 0
      }, () => {
        this.props.clearResetActiveGif();
      });
    }
  }

  render() {
    return (
      <div className="gif-rotator">
        {this.props.gifs.length > 0 && this.props.gifs.map((gif, index) => {
          return (
            <Gif
              activeGifIndex={this.state.activeGifIndex}
              gifObject={gif}
              gifId={index}
              key={index}
            />
          )
        })}
      </div>
    );
  }
}

export default GifRotator;