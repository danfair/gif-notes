import React, { Component } from 'react';
import axios from 'axios';
import createRemodal from 'react-remodal';
import 'react-remodal/styles/main.css';
import Cookies from 'universal-cookie';
import Settings from '../components/Settings';
import SpotifyPlayerContainer from './SpotifyPlayerContainer';
import PlaylistPicker from './PlaylistPicker';
import GifRotator from './GifRotator';
import querystring from 'querystring';

const cookies = new Cookies();
const Remodal = createRemodal();
const defaultSettings = {
  transitionTime: 5,   // 1-10s
  gifRating: 'pg13',   // g, pg, pg13, r
  searchTerms: 'both',   // artist, song, both
  showPlayer: true,
  showArtistSong: true
};

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: null,
      isPlaying: false,
      refreshToken: null,
      songId: null,
      songTitle: null,
      songArtist: null,
      isSettingsModalOpen: false,
      settings: {},
      isPlaylistPickerOpen: false,
      playlistId: null, 
      gifs: [],
      gifQueryOffset: 0
    };

    this.getCurrentTrack = this.getCurrentTrack.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
    this.togglePlaylistPicker = this.togglePlaylistPicker.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.updatePlaylistUri = this.updatePlaylistUri.bind(this);
  }

  componentDidMount() {
    let settings;
    if (cookies.get('gn_settings')) {
      settings = cookies.get('gn_settings');
    } else {
      settings = defaultSettings;
      cookies.set('gn_settings', defaultSettings);
    }

    let playlistUri = cookies.get('gn_pu') || null;

    this.setState({
      accessToken: cookies.get('gn_at'),
      refreshToken: cookies.get('gn_rt'),
      settings, 
      playlistUri
    }, this.getCurrentTrack);

    // TODO: replace updating data with sockets?
    this.songRefreshInterval = setInterval(this.getCurrentTrack, 5000);
  }

  updateToken() {
    axios(`/refresh/${this.state.refreshToken}`)
      .then((response) => {
        this.setState({
          accessToken: response.data.access_token
        }, () => {
          cookies.set('gn_at', response.data.access_token);
        });
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
        // update info if the song id is different than id in state
        if (response.data.item.id !== this.state.songId || response.data.is_playing !== this.state.isPlaying)  {
          const artists = response.data.item.artists.map((artist) => {
            return artist.name;
          }).join(', ');

          this.setState({
            songId: response.data.item.id,
            songArtist: artists,
            songTitle: response.data.item.name,
            isPlaying: response.data.is_playing,
            playlistUri: response.data.item.uri
          }, () => {
            this.updateGifs(artists, response.data.item.name);
          });
        }
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error.message === 'The access token expired') {
          this.updateToken();
        } else {
          // window.location.replace('/');
          console.error(err);
        }
      });
  }

  toggleSettingsModal() {
    this.setState({
      isSettingsModalOpen: !this.state.isSettingsModalOpen
    });
  }

  togglePlaylistPicker() {
    this.setState({
      isPlaylistPickerOpen: !this.state.isPlaylistPickerOpen
    });
  }

  updateGifs(artists, songTitle) {
    // get the search terms based on user settings
    let gifQuery;
    if (this.state.settings.searchTerms === 'both') {
      gifQuery = encodeURIComponent(artists + ' ' + songTitle);
    } else if (this.state.settings.searchTerms === 'artist') {
      gifQuery = encodeURIComponent(artists);
    } else {
      gifQuery = encodeURIComponent(songTitle);
    }

    let queryString = querystring.stringify({
      query: gifQuery,
      gifRating: this.state.settings.gifRating,
      offset: this.state.gifQueryOffset
    });

    axios(`/gifs?${queryString}`)
      .then((response) => {
        console.log('update gifs response', response);
        this.setState({
          gifs: response.data
        });
      });
  }

  updateSettings(settings) {
    this.setState({
      settings
    }, () => {
      cookies.set('gn_settings', settings);
    });
  }

  updatePlaylistUri(playlistUri) {
    this.setState({
      playlistUri,
      isPlaylistPickerOpen: false
    }, () => {
      cookies.set('gn_pu', playlistUri);
    });
  }

  render() {
    return (
      <div>
        Player screen!
        <div>Is playing: {this.state.isPlaying ? 'yes' : 'no'}</div>
        <div>Artists: {this.state.songArtist ? this.state.songArtist : 'n/a'}</div>
        <div>Song: {this.state.songTitle ? this.state.songTitle : 'n/a'}</div>
        <button onClick={this.toggleSettingsModal}>Toggle settings</button>
        <div>Transition time: {this.state.settings.transitionTime}</div>
        <div>Max GIF rating: {this.state.settings.gifRating}</div>
        <div>Search terms: {this.state.settings.searchTerms}</div>
        <div>Show Player: {this.state.settings.showPlayer ? 'true' : 'false'}</div>
        <div>Show Artist/Song: {this.state.settings.showArtistSong ? 'true' : 'false'}</div>
        <button onClick={this.togglePlaylistPicker}>Pick playlist</button>
        <div>Playlist URI: {this.state.playlistUri}</div>
        <div>Number of GIFs: {this.state.gifs.length}</div>
        <GifRotator
          gifs={this.state.gifs}
          transitionTime={this.state.settings.transitionTime}
        />
        <Remodal isOpen={this.state.isSettingsModalOpen} onClose={this.toggleSettingsModal}>
          <Settings 
            settings={this.state.settings}
            updateSettings={this.updateSettings}
          />
        </Remodal>
        <Remodal isOpen={this.state.isPlaylistPickerOpen} onClose={this.togglePlaylistPicker}>
          <PlaylistPicker
            accessToken={this.state.accessToken}
            updatePlaylistUri={this.updatePlaylistUri}
          />
        </Remodal>  
        {this.state.playlistUri && 
          <SpotifyPlayerContainer
            playlistUri={this.state.playlistUri}
          />
        }
      </div>
    );
  }
}

export default Player;