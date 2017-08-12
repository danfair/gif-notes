import React from 'react';
import PropTypes from 'prop-types';
import SpotifyPlayer from 'react-spotify-player';
import SpotifyPlayerControls from './SpotifyPlayerControls';

const SpotifyPlayerContainer = ({ playlistUri, showPlayer, showPlayInstructions, togglePlaylistPicker, toggleSpotifyPlayer }) => {
  const statusClassName = showPlayer === true ? 'spotify-player open' : 'spotify-player';

  return (
    <div className={statusClassName}>
      <SpotifyPlayerControls
        showPlayer={showPlayer}
        showPlayInstructions={showPlayInstructions}
        togglePlaylistPicker={togglePlaylistPicker}
        toggleSpotifyPlayer={toggleSpotifyPlayer}
      />
      <SpotifyPlayer
        uri={playlistUri}
        size="compact"
        view="coverart"
        theme="black"
      />
    </div>
  );
};

SpotifyPlayerContainer.propTypes = {
  playlistUri: PropTypes.string.isRequired,
  showPlayer: PropTypes.bool.isRequired,
  showPlayInstructions: PropTypes.bool.isRequired,
  togglePlaylistPicker: PropTypes.func.isRequired,
  toggleSpotifyPlayer: PropTypes.func.isRequired,
};

export default SpotifyPlayerContainer;
