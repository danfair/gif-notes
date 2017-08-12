import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import spotifyIcon from '../img/spotify.png';

const NavHeader = ({ accessToken }) => {
  return (
    <nav className="main-nav">
      <div className="container">
        <h1 className="main-nav__logo">Gif Notes</h1>
        {accessToken && accessToken.length ? (
          <Link
            to="/player"
            className="btn btn--green"
          >
            <img src={spotifyIcon} alt="Spotify logo" className="btn__icon" />
            <span>Go to player</span>
          </Link>
        ) : (
          <a href="/login" className="btn btn--green">
            <img src={spotifyIcon} alt="Spotify logo" className="btn__icon" />
            <span>Login</span>
          </a>
        )}
      </div>
    </nav>
  );
};

NavHeader.propTypes = {
  accessToken: PropTypes.string.isRequired,
};

export default NavHeader;
