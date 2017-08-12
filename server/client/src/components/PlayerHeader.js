import React from 'react';
import PropTypes from 'prop-types';
import PlayerSongInfo from './PlayerSongInfo';
import hamburgerIcon from '../img/hamburger.png';

const PlayerHeader = ({ songArtist, songTitle, showArtistSong, isPlaying, toggleSettingsModal, isMouseMovingAround }) => {

  const menuButtonClass = isMouseMovingAround ? 'menu-button fade-in' : 'menu-button';

  return (
    <div>
      <button className={menuButtonClass} onClick={toggleSettingsModal}>
        <img src={hamburgerIcon} alt="Menu" className="menu-button__icon" />
      </button>
      <PlayerSongInfo
        songArtist={songArtist}
        songTitle={songTitle}
        showArtistSong={showArtistSong}
        isPlaying={isPlaying}
      />
    </div>
  );
};

PlayerHeader.propTypes = {
  songArtist: PropTypes.string.isRequired,
  songTitle: PropTypes.string.isRequired,
  showArtistSong: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  toggleSettingsModal: PropTypes.func.isRequired,
  isMouseMovingAround: PropTypes.bool.isRequired,
};

export default PlayerHeader;
