import React from 'react';

const PlaylistButton = ({updatePlaylistUri, playlist}) => {
  return (
      <button 
        className="playlist"
        onClick={() => {updatePlaylistUri(playlist.uri)}}
      >
        {playlist.name}
      </button>
  );
}

export default PlaylistButton;