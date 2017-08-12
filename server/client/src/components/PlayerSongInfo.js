import React from 'react';
import PropTypes from 'prop-types';

const PlayerSongInfo = ({ songArtist, songTitle, showArtistSong, isPlaying }) => {
  const displayClassName = showArtistSong === true && isPlaying ? 'player__playing-info open' : 'player__playing-info';
  return (
    <div className={displayClassName}>
      <h2>{songTitle}</h2>
      <h1>{songArtist}</h1>
    </div>
  );
};

PlayerSongInfo.propTypes = {
  songArtist: PropTypes.string.isRequired,
  songTitle: PropTypes.string.isRequired,
  showArtistSong: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default PlayerSongInfo;
