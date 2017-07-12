import React, { Component } from 'react';

class Gif extends Component {

  render() {
    let iframeClassName = '';
    let bgStyle = {};

    if (this.props.activeGifIndex === this.props.gifId) {
      iframeClassName = 'active-gif';
      bgStyle = {backgroundImage: `url(${this.props.gifObject.images.original.url})`};
    } else if (this.props.activeGifIndex - 1 === this.props.gifId) {
      iframeClassName = 'prev-gif';
      bgStyle = {backgroundImage: `url(${this.props.gifObject.images.original.url})`};
    }
    
    return (
      <div style={bgStyle} className={`gif ${iframeClassName}`}></div>
    );
  }
}

export default Gif;