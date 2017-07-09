import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';

class SpotifyPlayerContainer extends Component {
  render() {
    return (
      <div>
        <SpotifyPlayer
          uri={this.props.playlistUri}
          size='large'
          view='coverart'
          theme='black'
        />
      </div>
    );
  }
}

export default SpotifyPlayerContainer;