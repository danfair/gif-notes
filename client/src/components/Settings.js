import React, { Component } from 'react';

class Settings extends Component {

  constructor(props) {
    super(props);

    this.updateSettings = this.updateSettings.bind(this);
  }

  updateSettings() {
    let newSettings = {
      transitionTime: this.transitionInput.value,
      gifRating: this.gifRatingInput.value,
      searchTerms: this.searchTermInput.value,
      showPlayer: this.showPlayerInput.checked,
      showArtistSong: this.showArtistSongInput.checked
    };

    this.props.updateSettings(newSettings);
  }

  render() {
    return (
      <div>
        <h1>Settings</h1>
        <form>
          <div>
            <label>GIF duration</label>
            <input 
              type="number" 
              ref={transitionInput => this.transitionInput = transitionInput} 
              onChange={this.updateSettings} 
              value={this.props.settings.transitionTime}
            />
          </div>
          <div>
            <label>Maximum GIF rating</label>
            <select 
              ref={gifRatingInput => this.gifRatingInput = gifRatingInput}
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
          <div>
            <label>Search Terms</label>
            <select 
              ref={searchTermInput => this.searchTermInput = searchTermInput}
              onChange={this.updateSettings} 
              name="seach-terms"
              value={this.props.settings.searchTerms}
            >
              <option value="artist">Artist only</option>
              <option value="song">Song only</option>
              <option value="both">Artist and Song</option>
            </select>
          </div>
          <div>
            <label>Show Player</label>
            <input
              type="checkbox" 
              ref={showPlayerInput => this.showPlayerInput = showPlayerInput}
              onChange={this.updateSettings} 
              name="show-player"
              defaultChecked={this.props.settings.showPlayer}
            >
            </input>
          </div>
          <div>
            <label>Show Artist &amp; Song</label>
            <input
              type="checkbox" 
              ref={showArtistSongInput => this.showArtistSongInput = showArtistSongInput}
              onChange={this.updateSettings} 
              name="show-artist-song"
              defaultChecked={this.props.settings.showArtistSong}
            >
            </input>
          </div>

        </form>
      </div>
    );
  }
}

export default Settings;