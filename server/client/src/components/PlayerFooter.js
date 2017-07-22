import React, { Component } from 'react';
import SpotifyPlayerContainer from './SpotifyPlayerContainer';
import poweredByGiphyImg from '../img/giphy.png';

class PlayerFooter extends Component {
  render() {
    return (
      <div>
        {this.props.playlistUri && 
          <div className="spotify-player-wrapper">
            <SpotifyPlayerContainer
              playlistUri={this.props.playlistUri}
              toggleSpotifyPlayer={this.props.toggleSpotifyPlayer}
              togglePlaylistPicker={this.props.togglePlaylistPicker}
              showPlayer={this.props.showPlayer}
              showPlayInstructions={this.props.isPlayInstructionsVisible}
            />
          </div>
        }
        <img src={poweredByGiphyImg} alt="Powered by Giphy" className="player__giphy-img" />
      </div>
    );
  }
}

export default PlayerFooter;