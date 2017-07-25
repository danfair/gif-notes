import React from 'react';
import SpotifyPlayerContainer from './SpotifyPlayerContainer';
import poweredByGiphyImg from '../img/giphy.png';

const PlayerFooter = ({playlistUri, toggleSpotifyPlayer, togglePlaylistPicker, showPlayer, showPlayInstructions, isMouseMovingAround}) => {

  const wrapperClass = !isMouseMovingAround && !showPlayer ? 'spotify-player-wrapper' : 'spotify-player-wrapper faded-in';

  return (
    <div>
      {playlistUri && 
        <div className={wrapperClass}>
          <SpotifyPlayerContainer
            playlistUri={playlistUri}
            toggleSpotifyPlayer={toggleSpotifyPlayer}
            togglePlaylistPicker={togglePlaylistPicker}
            showPlayer={showPlayer}
            showPlayInstructions={showPlayInstructions}
          />
        </div>
      }
      <img src={poweredByGiphyImg} alt="Powered by Giphy" className="player__giphy-img" />
    </div>
  );
}

export default PlayerFooter;