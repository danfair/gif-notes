import React, { Component } from 'react';

class GifRotator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeGifIndex: 0,
      nextGifIndex: 1
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.transitionTime);
    this.rotateGifInterval = setInterval(() => {
      console.log('hi');
    }, nextProps.transitionTime * 1000);
  }

  render() {
    return (
      <div>
        gif rotator
        {this.props.transitionTime}
      </div>
    );
  }
}

export default GifRotator;