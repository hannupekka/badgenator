// @flow
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import data from 'redux/modules/data';
import ui from 'redux/modules/ui';

const rootReducer = combineReducers({
  data,
  ui,
  routing: routerReducer
});

export default rootReducer;
