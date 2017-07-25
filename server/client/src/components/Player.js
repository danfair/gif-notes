import React, { Component } from 'react';
import { Redirect } from 'react-router';

import axios from 'axios';
import Modal from 'react-awesome-modal';
import Cookies from 'universal-cookie';
import querystring from 'querystring';

import Settings from '../components/Settings';
import PlaylistPicker from './PlaylistPicker';
import PlayerHeader from './PlayerHeader';
import PlayerFooter from './PlayerFooter';
import GifRotator from './GifRotator';
import NotPlaying from './NotPlaying';

import defaultSettings from '../data/defaultSettings';
const cookies = new Cookies();

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: cookies.get('gn_at'),
      gifs: [],
      gifQueryOffset: 0,
      isMouseMovingAround: false,
      isPlayInstructionsVisible: false,
      isPlaying: null,
      isPlaylistPickerOpen: false,
      isSettingsModalOpen: false,
      playlistId: null, 
      refreshToken: cookies.get('gn_rt'),
      resetActiveGif: false,
      settings: {},
      songId: null,
      songTitle: null,
      songArtist: null
    };

    this.clearResetActiveGif = this.clearResetActiveGif.bind(this);
    this.getCurrentTrack = this.getCurrentTrack.bind(this);
    this.getMoreGifs = this.getMoreGifs.bind(this);
    this.toggleSettingsModal = this.toggleSettingsModal.bind(this);
    this.toggleSpotifyPlayer = this.toggleSpotifyPlayer.bind(this);
    this.togglePlaylistPicker = this.togglePlaylistPicker.bind(this);
    this.updateMouseMovement = this.updateMouseMovement.bind(this);
    this.updatePlaylistUri = this.updatePlaylistUri.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.updateToken = this.updateToken.bind(this);
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
    this.songRefreshInterval = setInterval(this.getCurrentTrack, 2000);

    document.addEventListener('mousemove', this.updateMouseMovement, false);
  }

  updateMouseMovement() {
    this.setState({
      isMouseMovingAround: true
    }, () => {
      clearTimeout(this.mouseMovementTimeout);
      this.mouseMovementTimeout = setTimeout(() => {
        this.setState({
          isMouseMovingAround: false
        });
      }, 4000);
    });
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
      .catch(function (err) {
        console.error('updateTokenError:', err);
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
            resetActiveGif: true,
            isPlayInstructionsVisible: this.state.isPlayInstructionsVisible && !response.data.is_playing
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
          // cookies.remove('gn_at');
          // cookies.remove('gn_rt');
          // cookies.remove('gn_pu');
          // cookies.remove('gn_settings');
          // window.location.replace('/');
          console.error('getCurrentTrack error:', err);
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
      if (Math.random() >= 0.5) {
        gifQuery = encodeURIComponent(`${artists} ${songTitle}`);
      } else {
        gifQuery = encodeURIComponent(`${songTitle} ${artists}`);
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
      })
      .catch((err) => {
        console.err('updateGifsError:', err);
      })
  }

  getMoreGifs(queryString) {
    if (!queryString) {
      queryString = this.state.isPlaying ? this.getGifQueryString(this.state.songArtist, this.state.songTitle) : 'sad';
    }

    axios(`/gifs?query=${queryString}`)
      .then((response) => {
        if (response.data.length) {
          this.setState((prevState, props) => {
            return {
              gifs: prevState.gifs.concat(response.data),
              gifQueryOffset: prevState.gifQueryOffset + response.data.length
            }
          });
        } else {
          this.getMoreGifs(this.getGifQueryString('crazy', 'random'));
        }
      })
      .catch((err) => {
        console.error('getMoreGifs error:', err);
      })
  }

  updateSettings(settings) {
    this.setState({
      settings
    }, () => {
      cookies.set('gn_settings', settings);
    });
  }

  updatePlaylistUri(playlistUri) {
    let tempSettings = this.state.settings;
    tempSettings.showPlayer = true;

    this.setState({
      playlistUri,
      isPlaylistPickerOpen: false,
      isPlayInstructionsVisible: true,
      settings: tempSettings
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
      <div className="player">
        <PlayerHeader
          songArtist={this.state.songArtist}
          songTitle={this.state.songTitle}
          showArtistSong={this.state.settings.showArtistSong}
          isPlaying={this.state.isPlaying}
          toggleSettingsModal={this.toggleSettingsModal}
          isMouseMovingAround={this.state.isMouseMovingAround}
        />
        <GifRotator
          gifs={this.state.gifs}
          transitionTime={this.state.settings.transitionTime}
          getMoreGifs={this.getMoreGifs}
          gifQueryOffset={this.state.gifQueryOffset}
          resetActiveGif={this.state.resetActiveGif}
          clearResetActiveGif={this.clearResetActiveGif}
          isPlaying={this.state.isPlaying}
        />
        {this.state.isPlaying === false && !this.state.isPlaylistPickerOpen && !this.state.isSettingsModalOpen && 
          <NotPlaying />
        }
        <PlayerFooter
          playlistUri={this.state.playlistUri}
          toggleSpotifyPlayer={this.toggleSpotifyPlayer}
          togglePlaylistPicker={this.togglePlaylistPicker}
          showPlayer={this.state.settings.showPlayer}
          showPlayInstructions={this.state.isPlayInstructionsVisible}
          isMouseMovingAround={this.state.isMouseMovingAround}
        />
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
        <div className="modal-container">
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
              closePlaylistPicker={this.togglePlaylistPicker}
            />
          </Modal>  
        </div>
      </div>
    );
  }
}

export default Player;