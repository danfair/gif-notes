import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
// import { browserHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// import the root reducer
import rootReducer from './reducers/index';

// import comments from './data/comments';
// import posts from './data/posts';

// create an object for the default data
const defaultState = {
  // posts,
  // comments
  settings: {

  }
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(createBrowserHistory(), store);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
