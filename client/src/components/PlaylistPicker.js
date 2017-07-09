import React, { Component } from 'react';
import axios from 'axios';

class PlaylistPicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playlists: null
    };
  }

  componentDidMount() {
    axios('https://api.spotify.com/v1/me/playlists/?limit=50', {
      headers: {
        'Authorization': `Bearer ${this.props.accessToken}`
      }
    })
      .then((response) => {
        console.log('response', response);
        this.setState({
          playlists: response.data.items
        })
      })
  }

  render() {
    return (
      <div>
        accessToken: {this.props.accessToken}
        {this.state.playlists && this.state.playlists.map((playlist, index) => {
          return (
            <button 
              key={index}
              onClick={() => {this.props.updatePlaylistUri(playlist.uri)}}
            >
                {playlist.name}
            </button>
          )
        })}
      </div>
    );
  }
}

export default PlaylistPicker;