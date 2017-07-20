import React, { Component } from 'react';

class PlayerSongInfo extends Component {
  render() {
    const displayClassName = this.props.showArtistSong === true ? 'player__playing-info open' : 'player__playing-info';
    return (
      <div className={displayClassName}>
        <h1>{this.props.songArtist}</h1>
        <h2>{this.props.songTitle}</h2>
      </div>
    );
  }
}

export default PlayerSongInfo;