import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import PlaylistButton from './PlaylistButton';
import closeIcon from '../img/close.png';

class PlaylistPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: []
    };

    this.getPlaylists = this.getPlaylists.bind(this);
  }

  componentDidMount() {
    this.getPlaylists();
  }

  getPlaylists() {
    axios('https://api.spotify.com/v1/me/playlists/?limit=50', {
      headers: {
        'Authorization': `Bearer ${this.props.accessToken}`
      }
    })
      .then((response) => {
        this.setState({
          playlists: response.data.items
        })
      })
      .catch((err) => {
        console.error('playlistPicker error:', err);
        this.props.updateToken();
        this.getPlaylists();
      })
  }

  render() {
    return (
      <div className="modal__content">
        <button 
          onClick={this.props.closePlaylistPicker}
          className="modal__close-button"
        >
          Close modal
          <img src={closeIcon} alt="close" />
        </button>
        <h1 className="modal__title">Playlists</h1>
        <div className="playlists">
          {this.state.playlists.map((playlist, index) => {
            return (
              <PlaylistButton
                key={index}
                updatePlaylistUri={this.props.updatePlaylistUri}
                playlist={playlist}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default PlaylistPicker;