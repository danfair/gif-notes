import React, { Component } from 'react';

class NotPlaying extends Component {
  render() {
    return (
      <div className="not-playing">
        <h1 className="not-playing__title">Sad!</h1>
        <p>You're not playing anything.</p>
      </div>
    );
  }
}

export default NotPlaying;