import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import SpotifyPlayerControls from './SpotifyPlayerControls';

class SpotifyPlayerContainer extends Component {
  render() {
    let statusClassName = this.props.showPlayer === true ? 'spotify-player open' : 'spotify-player';
    return (
      <div className={statusClassName}>
        <SpotifyPlayerControls
          showPlayer={this.props.showPlayer}
          showPlayInstructions={this.props.showPlayInstructions}
          togglePlaylistPicker={this.props.togglePlaylistPicker}
          toggleSpotifyPlayer={this.props.toggleSpotifyPlayer}
        />
        <SpotifyPlayer
          uri={this.props.playlistUri}
          size="compact"
          view="coverart"
          theme="black"
        />
      </div>
    );
  }
}

export default SpotifyPlayerContainer;