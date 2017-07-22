import React, { Component } from 'react';
import axios from 'axios';
import closeIcon from '../img/close.png';

class PlaylistPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: []
    };
  }

  componentDidMount() {
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
              <button 
                key={index}
                className="playlist"
                onClick={() => {this.props.updatePlaylistUri(playlist.uri)}}
              >
                  {playlist.name}
              </button>
            )
          })}
        </div>
      </div>
    );
  }
}

export default PlaylistPicker;