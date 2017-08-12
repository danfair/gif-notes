import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import twIcon from '../img/tw.png';
import fbIcon from '../img/fb.png';
import spotifyIcon from '../img/spotify.png';

const cookies = new Cookies();

class SettingsFooter extends Component {

  static logout() {
    cookies.remove('gn_at');
    cookies.remove('gn_rt');
    cookies.remove('gn_pu');
    cookies.remove('gn_settings');
    window.location.replace('/');  // eslint-disable-line
  }

  render() {
    return (
      <div className="settings-footer">
        <div className="share-shelf">
          <a href="https://www.facebook.com/sharer/sharer.php?u=http%3A//gifnotes.net" target="_blank" rel="noopener noreferrer">
            <img src={fbIcon} alt="Share on Facebook" />
          </a>
          <a href="https://twitter.com/home?status=Visualize%20your%20music%20listening%20experience%20with%20Gif%20Notes%20%23gifnotes%20http%3A//www.gifnotes.net" target="_blank" rel="noopener noreferrer">
            <img src={twIcon} alt="Share on Twitter" />
          </a>
        </div>
        <button onClick={this.logout} className="btn btn--green">
          <img src={spotifyIcon} alt="Spotify logo" className="btn__icon" />
          <span>Logout</span>
        </button>
      </div>
    );
  }
}

export default SettingsFooter;
