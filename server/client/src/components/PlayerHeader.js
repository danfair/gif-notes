import React, { Component } from 'react';
import PlayerSongInfo from './PlayerSongInfo';
import hamburgerIcon from '../img/hamburger.png';

class PlayerHeader extends Component {
  render() {
    return (
      <div>
        <button className="menu-button" onClick={this.props.toggleSettingsModal}>
          <img src={hamburgerIcon} alt="Menu" className="menu-button__icon" />
        </button>
        <PlayerSongInfo
          songArtist={this.props.songArtist}
          songTitle={this.props.songTitle}
          showArtistSong={this.props.showArtistSong}
          isPlaying={this.props.isPlaying}
        />
      </div>
    );
  }
}

export default PlayerHeader;