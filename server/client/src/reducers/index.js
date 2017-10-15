import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// import posts from './posts';
// import comments from './comments';
import settings from './settings';

const rootReducer = combineReducers({ settings, routing: routerReducer });

export default rootReducer;