import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import HomePage from './components/HomePage';
import Player from './components/Player';
import NoMatch from './components/NoMatch';

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route render={({ location }) => (
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            <Switch key={location.key} location={location}>
              <Route exact path="/" component={HomePage} />
              <Route path="/player" component={Player} />
              <Route component={NoMatch}/>
            </Switch>
          </CSSTransitionGroup>
        )} />
      </BrowserRouter>
    );
  }
}

export default AppRouter;