import React, { Component } from 'react';
import { Redirect } from 'react-router';

import axios from 'axios';
import Modal from 'react-awesome-modal';
import Cookies from 'universal-cookie';
import querystring from 'querystring';

import Settings from '../components/Settings';
import SpotifyPlayerContainer from './SpotifyPlayerContainer';
import PlaylistPicker from './PlaylistPicker';
import PlayerSongInfo from './PlayerSongInfo';
import GifRotator from './GifRotator';

import defaultSettings from '../data/defaultSettings';
import hamburgerIcon from '../img/hamburger.png';
import poweredByGiphyImg from '../img/giphy.png';
const cookies = new Cookies();

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: cookies.get('gn_at'),
      isPlaying: false,
      refreshToken: cookies.get('gn_rt'),
      songId: null,
      songTitle: null,
      songArtist: null,
      isSettingsModalOpen: false,
      settings: {},
      isPlaylistPickerOpen: false,
      playlistId: null, 
      gifs: [],
      gifQueryOffset: 0,
      resetActiveGif: false
    };

    this.getCurrentTrack = this.getCurrentTrack.bind(this);
    this.updateToken = this.updateToken.bind(this);
    this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
    this.togglePlaylistPicker = this.togglePlaylistPicker.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.updatePlaylistUri = this.updatePlaylistUri.bind(this);
    this.getMoreGifs = this.getMoreGifs.bind(this);
    this.clearResetActiveGif = this.clearResetActiveGif.bind(this);
    this.toggleSpotifyPlayer = this.toggleSpotifyPlayer.bind(this);
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
      settings, 
      playlistUri
    }, this.getCurrentTrack);

    // TODO: replace updating data with sockets?
    this.songRefreshInterval = setInterval(this.getCurrentTrack, 4000);
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
            playlistUri: response.data.item.uri,
            gifQueryOffset: 0,
            resetActiveGif: true
          }, () => {
            // if the player is now playing, get new gifs
            // otherwise get sad gifs
            if (response.data.is_playing) {
              this.updateGifs(artists, response.data.item.name);
            } else {
              this.updateGifs('sad', 'sad');
            }
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

  toggleSpotifyPlayer() {
    this.setState((prevState, props) => {
      let settings = prevState.settings;
      settings.showPlayer = !settings.showPlayer;
      return {settings};
    });
  }

  togglePlaylistPicker() {
    this.setState({
      isPlaylistPickerOpen: !this.state.isPlaylistPickerOpen
    });
  }

  getGifQueryString(artists, songTitle) {
    let gifQuery;
    if (this.state.settings.searchTerms === 'both') {
      // mix it up so it's not always the same gifs
      // for same artists
      if (Math.random() > 0.5) {
        gifQuery = encodeURIComponent(artists + ' ' + songTitle);
      } else {
        gifQuery = encodeURIComponent(songTitle + ' ' + artists);
      }
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

    return queryString;
  }

  updateGifs(artists, songTitle) {
    const queryString = this.getGifQueryString(artists, songTitle);

    axios(`/gifs?${queryString}`)
      .then((response) => {
        this.setState({
          gifs: response.data,
          gifQueryOffset: this.state.gifQueryOffset + response.data.length || response.data.length
        });
      });
  }

  getMoreGifs() {
    const queryString = this.state.isPlaying ? this.getGifQueryString(this.state.songArtist, this.state.songTitle) : 'sad';

    axios(`/gifs?query=${queryString}`)
      .then((response) => {
        this.setState((prevState, props) => {
          return {
            gifs: prevState.gifs.concat(response.data),
            gifQueryOffset: prevState.gifQueryOffset + response.data.length
          }
        })
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

  clearResetActiveGif() {
    this.setState({
      resetActiveGif: false
    })
  }

  render() {
    if (!this.state.accessToken || !this.state.refreshToken) {
      return <Redirect push to="/" />
    }

    return (
      <div>
        <button className="menu-button" onClick={this.toggleSettingsModal}>
          <img src={hamburgerIcon} alt="Menu" className="menu-button__icon" />
        </button>
        <PlayerSongInfo
          songArtist={this.state.songArtist}
          songTitle={this.state.songTitle}
          showArtistSong={this.state.settings.showArtistSong}
        />
        <GifRotator
          gifs={this.state.gifs}
          transitionTime={this.state.settings.transitionTime}
          getMoreGifs={this.getMoreGifs}
          gifQueryOffset={this.state.gifQueryOffset}
          resetActiveGif={this.state.resetActiveGif}
          clearResetActiveGif={this.clearResetActiveGif}
        />
        {this.state.playlistUri && 
          <div className="spotify-player-wrapper">
            <SpotifyPlayerContainer
              playlistUri={this.state.playlistUri}
              toggleSpotifyPlayer={this.toggleSpotifyPlayer}
              togglePlaylistPicker={this.togglePlaylistPicker}
              showPlayer={this.state.settings.showPlayer}
            />
          </div>
        }
        <img src={poweredByGiphyImg} alt="Powered by Giphy" className="player__giphy-img" />
        <div className="player__overlay"></div>
        <div className="modal-container">
          <Modal 
            visible={this.state.isSettingsModalOpen} 
            width="600" 
            height="600" 
            effect="fadeInUp" 
            onClickAway={this.toggleSettingsModal}
          >
            <Settings 
              settings={this.state.settings}
              updateSettings={this.updateSettings}
              closeSettingsModal={this.toggleSettingsModal}
            />
          </Modal>
        </div>
        <Modal 
          visible={this.state.isPlaylistPickerOpen} 
          width="600" 
          height="600" 
          effect="fadeInUp" 
          onClickAway={this.togglePlaylistPicker}
        >
          <PlaylistPicker
            accessToken={this.state.accessToken}
            updatePlaylistUri={this.updatePlaylistUri}
          />
        </Modal>  
      </div>
    );
  }
}

export default Player;