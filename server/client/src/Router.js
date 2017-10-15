import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import { Provider } from 'react-redux';

import App from './components/App';
import HomePage from './components/HomePage';
import Player from './components/Player';

import store from './store';

class AppRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route render={({ location }) => (
            <CSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
            >
              <Switch key={location.key} location={location}>
                <Route exact path="/" component={HomePage} />
                <Route path="/player" component={App} />
              </Switch>
            </CSSTransitionGroup>
          )} />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default AppRouter;
