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
    if (this.props.transitionTime !== nextProps.transitionTime) {

      clearInterval(this.rotateGifInterval);

      this.rotateGifInterval = setInterval(() => {
        this.setState({
          activeGifIndex: this.state.activeGifIndex + 1,
          nextGifIndex: this.state.nextGifIndex + 1
        }, () => {
          console.log('this.state.activeGifIndex', this.state.activeGifIndex);
          console.log('this.props.gifQueryOffset', this.props.gifQueryOffset);
          if (this.state.activeGifIndex > this.props.gifQueryOffset - 5) {
            this.props.getMoreGifs();
          }
        });
      }, nextProps.transitionTime * 1000);
    }
  }

  render() {
    return (
      <div>
        gif rotator
        {this.props.transitionTime}
        {this.props.gifs.length > 0 && 
          <div>
            <div style={{width:'100%',height:0,paddingBottom:'56%',position:'relative'}}><iframe src={this.props.gifs[this.state.activeGifIndex].embed_url} width="100%" height="100%" style={{position:'absolute'}} frameBorder="0" title={this.props.gifs[this.state.activeGifIndex].url} className="giphy-embed" allowFullScreen></iframe></div>
            <div style={{width:'100%',height:0,paddingBottom:'56%',position:'relative'}}><iframe src={this.props.gifs[this.state.nextGifIndex].embed_url} width="100%" height="100%" style={{position:'absolute'}} frameBorder="0" title={this.props.gifs[this.state.activeGifIndex].url} className="giphy-embed" allowFullScreen></iframe></div>
          </div>
        }
      </div>
    );
  }
}

export default GifRotator;