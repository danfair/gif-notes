import React, { Component } from 'react';
import spotifyIcon from '../img/spotify.png';

class NavHeader extends Component {
  render() {
    return (
      <nav className="main-nav">
        <div className="container">
          <h1 className="main-nav__logo">Gif Notes</h1>
          <a href="http://localhost:3001/login" className="btn btn--green">
            <img src={spotifyIcon} alt="Spotify logo" className="btn__icon" />
            <span>Login</span>
          </a>
        </div>
      </nav>
    );
  }
}

export default NavHeader;