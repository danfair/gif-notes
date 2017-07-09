import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';

import Login from './components/Login';
import PlayerContainer from './components/PlayerContainer';

class AppRouter extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/player">player</Link></li>
            <li><Link to="/settings">settings</Link></li>
          </ul>

          <Route render={({ location }) => (
            <CSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              <Switch key={location.key} location={location}>
                <Route exact path="/" component={Login} />
                <Route exact path="/player" component={PlayerContainer} />
              </Switch>
            </CSSTransitionGroup>
          )} />
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;