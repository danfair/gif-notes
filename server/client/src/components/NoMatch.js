import React, { Component } from 'react';
import { Redirect } from 'react-router';

class NoMatch extends Component {
  render() {
    return (
      <Redirect to="/?fail=true" />
    );
  }
}

export default NoMatch;