import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: null,
      isActive: false,
      refreshToken: null,
      songId: null,
      songTitle: null,
      songArtist: null
    };

    this.getCurrentTrack = this.getCurrentTrack.bind(this);
    this.updateToken = this.updateToken.bind(this);
  }

  componentDidMount() {
    this.setState({
      accessToken: cookies.get('at'),
      refreshToken: cookies.get('rt')
    }, this.getCurrentTrack);

    this.songRefreshInterval = setInterval(this.getCurrentTrack, 5000);
  }

  updateToken() {
    axios(`/refresh/${this.state.refreshToken}`)
      .then((response) => {
        this.setState({
          accessToken: response.data.access_token
        }, () => {
          cookies.set('at', response.data.access_token);
        })
      })
      .catch(function (error) {
        console.log('error', error);
      });
  }

  getCurrentTrack() {
    axios('https://api.spotify.com/v1/me/player', {
      headers: {
        'Authorization': `Bearer ${this.state.accessToken}`
      }
    })
      .then((response) => {
        console.log('response', response);
        if (response.data.item.id !== this.state.songId || response.data.is_playing !== this.state.isActive)  {
          const artists = response.data.item.artists.map((artist) => {
            return artist.name
          }).join(', ');

          this.setState({
            songId: response.data.item.id,
            songArtist: artists,
            songTitle: response.data.item.name,
            isActive: response.data.is_playing
          })
        }
      })
      .catch((err) => {
        if (err.response.data.error.message === 'The access token expired') {
          this.updateToken();
        }
      })
  }

  render() {
    if (this.state.isActive) {
      return (
        <div>
          Player screen!
          <div>Artists: {this.state.songArtist}</div>
          <div>Song: {this.state.songTitle}</div>
          <button onClick={this.getCurrentTrack}>Get currently played track</button>
        </div>
      );
    } else {
      return (
        <div>Not playing a song.
          <button onClick={this.getCurrentTrack}>Get currently played track</button>
        </div>
      )
    }
  }
}

export default Player;