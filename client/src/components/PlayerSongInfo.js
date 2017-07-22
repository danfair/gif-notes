import React, { Component } from 'react';

class PlayerSongInfo extends Component {
  render() {
    const displayClassName = this.props.showArtistSong === true && this.props.isPlaying ? 'player__playing-info open' : 'player__playing-info';
    return (
      <div className={displayClassName}>
        <h2>{this.props.songTitle}</h2>
        <h1>{this.props.songArtist}</h1>
      </div>
    );
  }
}

export default PlayerSongInfo;