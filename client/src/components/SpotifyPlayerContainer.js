import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-player';
import closeIcon from '../img/close.png';
class SpotifyPlayerContainer extends Component {
  render() {
    let statusClassName = this.props.showPlayer === true ? 'spotify-player open' : 'spotify-player';
    return (
      <div className={statusClassName}>
        <div className="spotify-player__btn-shelf">
          <button className="spotify-player__btn" onClick={this.props.togglePlaylistPicker}>Playlists</button>
          {this.props.showPlayer === true ? (
              <button className="spotify-player__close" onClick={this.props.toggleSpotifyPlayer}>
                <img src={closeIcon} alt="Close player" />
              </button>
            ) : (
              <button className="spotify-player__btn" onClick={this.props.toggleSpotifyPlayer}>Player</button>
            )
          }
        </div>

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