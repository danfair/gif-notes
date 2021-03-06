import React, { Component } from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../img/close.png';
import SettingsFooter from './SettingsFooter';

class Settings extends Component {

  constructor(props) {
    super(props);

    this.updateSettings = this.updateSettings.bind(this);
  }

  updateSettings() {
    const newSettings = {
      transitionTime: this.transitionInput.value,
      gifRating: this.gifRatingInput.value,
      searchTerms: this.searchTermInput.value,
      showPlayer: this.showPlayerInput.checked,
      showArtistSong: this.showArtistSongInput.checked,
    };

    this.props.updateSettings(newSettings);
  }

  render() {
    return (
      <div className="modal__content">
        <button
          onClick={this.props.closeSettingsModal}
          className="modal__close-button"
        >
          Close modal
          <img src={closeIcon} alt="close" />
        </button>
        <h1 className="modal__title">Settings</h1>
        <form className="settings__form">
          <div className="row--full">
            <div className="pre-label">GIF duration</div>
            <span className="settings__seconds">{this.props.settings.transitionTime} seconds</span>
            <input
              type="range"
              ref={(transitionInput) => { this.transitionInput = transitionInput; }}
              onChange={this.updateSettings}
              name="gif-transition"
              value={this.props.settings.transitionTime}
              min="4"
              max="12"
              step="1"
              className="gn__input-range"
            />
          </div>
          <div className="row--half">
            <div className="pre-label">Maximum GIF rating</div>
            <div className="gn__select">
              <select
                ref={(gifRatingInput) => { this.gifRatingInput = gifRatingInput; }}
                onChange={this.updateSettings}
                name="gif-rating"
                value={this.props.settings.gifRating}
              >
                <option value="g">G</option>
                <option value="pg">PG</option>
                <option value="pg13">PG13</option>
                <option value="r">R</option>
              </select>
            </div>
          </div>
          <div className="row--half">
            <div className="pre-label">Search Terms</div>
            <div className="gn__select">
              <select
                ref={(searchTermInput) => { this.searchTermInput = searchTermInput; }}
                onChange={this.updateSettings}
                name="seach-terms"
                value={this.props.settings.searchTerms}
              >
                <option value="artist">Artist only</option>
                <option value="song">Song only</option>
                <option value="both">Artist and Song</option>
              </select>
            </div>
          </div>
          <div className="row--half">
            <div className="pre-label">Show Player</div>
            <div className="gn__checkbox">
              <label htmlFor="show-player">
                <input
                  type="checkbox"
                  ref={(showPlayerInput) => { this.showPlayerInput = showPlayerInput; }}
                  onChange={this.updateSettings}
                  name="show-player"
                  id="show-player"
                  checked={this.props.settings.showPlayer}
                />
                <div className="box" />
              </label>
            </div>
          </div>
          <div className="row--half">
            <div className="pre-label">Show Artist &amp; Song</div>
            <div className="gn__checkbox">
              <label htmlFor="show-artist-song">
                <input
                  type="checkbox"
                  ref={(showArtistSongInput) => { this.showArtistSongInput = showArtistSongInput; }}
                  onChange={this.updateSettings}
                  name="show-artist-song"
                  id="show-artist-song"
                  checked={this.props.settings.showArtistSong}
                />
                <div className="box" />
              </label>
            </div>
          </div>
        </form>
        <SettingsFooter />
      </div>
    );
  }
}

Settings.propTypes = {
  closeSettingsModal: PropTypes.func.isRequired,
  settings: PropTypes.shape({
    transitionTime: PropTypes.number,
    gifRating: PropTypes.string,
    searchTerms: PropTypes.string,
    showPlayer: PropTypes.bool,
    showArtistSong: PropTypes.bool,
  }).isRequired,
  updateSettings: PropTypes.func.isRequired,
};

export default Settings;
