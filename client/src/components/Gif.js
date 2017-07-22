import React, { Component } from 'react';

class Gif extends Component {

  render() {
    let iframeClassName = '';
    let bgStyle = {};

    if (this.props.activeGifIndex === this.props.gifId) {
      iframeClassName = 'active-gif';
      bgStyle = {backgroundImage: `url(${this.props.gifObject.images.original.url})`};
    } else if (this.props.activeGifIndex - 1 === this.props.gifId || this.props.activeGifIndex + 1 === this.props.gifId) {
      iframeClassName = 'prev-gif';
      bgStyle = {backgroundImage: `url(${this.props.gifObject.images.original.url})`};
    }
    
    if (this.props.activeGifIndex <= this.props.gifId + 1) {
      return (
        <div style={bgStyle} className={`gif-rotator__gif gif ${iframeClassName}`}></div>
      );
    } else {
      return null;
    }
  }
}

export default Gif;