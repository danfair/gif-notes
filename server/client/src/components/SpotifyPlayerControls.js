import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../img/close.png';
import arrowIcon from '../img/arrow.png';

const SpotifyPlayerControls = ({showPlayer, showPlayInstructions, togglePlaylistPicker, toggleSpotifyPlayer}) => {
  return (
    <div className="spotify-player__btn-shelf">
      <button className="spotify-player__btn" onClick={togglePlaylistPicker}>Playlists</button>
      {showPlayer === true ? (
          <button className="spotify-player__close" onClick={toggleSpotifyPlayer}>
            <img src={closeIcon} alt="Close player" />
          </button>
        ) : (
          <button className="spotify-player__btn" onClick={toggleSpotifyPlayer}>Player</button>
        )
      }
      {showPlayInstructions && 
        <div className="spotify-player__play-instructions">
          <img src={arrowIcon} alt="" />
          <div>Now press play!</div>
        </div>
      }
    </div>
  );
}

export default SpotifyPlayerControls;