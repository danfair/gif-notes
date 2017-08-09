import React from 'react';
import PropTypes from 'prop-types';

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