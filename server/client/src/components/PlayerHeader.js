import React from 'react';
import PlayerSongInfo from './PlayerSongInfo';
import hamburgerIcon from '../img/hamburger.png';

const PlayerHeader = ({songArtist, songTitle, showArtistSong, isPlaying,toggleSettingsModal}) => {
  return (
    <div>
      <button className="menu-button" onClick={toggleSettingsModal}>
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