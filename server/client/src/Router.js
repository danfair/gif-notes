import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import LoginPage from './components/LoginPage';
import PlayerContainer from './components/PlayerContainer';

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
              <Route exact path="/" component={LoginPage} />
              <Route exact path="/player" component={PlayerContainer} />
            </Switch>
          </CSSTransitionGroup>
        )} />
      </BrowserRouter>
    );
  }
}

export default AppRouter;