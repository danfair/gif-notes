import React from 'react';
import PlayerSongInfo from './PlayerSongInfo';
import hamburgerIcon from '../img/hamburger.png';

const PlayerHeader = ({songArtist, songTitle, showArtistSong, isPlaying,toggleSettingsModal, isMouseMovingAround}) => {
  
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
}

export default PlayerHeader;