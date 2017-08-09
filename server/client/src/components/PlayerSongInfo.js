import React from 'react';
import PropTypes from 'prop-types';

const PlayerSongInfo = ({songArtist, songTitle, showArtistSong, isPlaying}) => {
  const displayClassName = showArtistSong === true && isPlaying ? 'player__playing-info open' : 'player__playing-info';
  return (
    <div className={displayClassName}>
      <h2>{songTitle}</h2>
      <h1>{songArtist}</h1>
    </div>
  );
}

export default PlayerSongInfo;