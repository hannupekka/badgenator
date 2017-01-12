// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import getHistoryInstance from 'utils/history';
import { routerMiddleware } from 'react-router-redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from 'redux/modules/index';
import DevTools from 'containers/utils/DevTools';

// Logger.
const loggerMiddleware = createLogger();

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware,
    loggerMiddleware,
    routerMiddleware(getHistoryInstance())
  ),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey())
);

module.exports = function configureStore(initialState?: Object) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const store = createStore(rootReducer, initialState, enhancer);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    // eslint-disable-next-line max-len
    // $FixMe Line below produces "call of method `accept`. Method cannot be called on 'hot' of unknown type".
    module.hot.accept('redux/modules/index', () =>
      // eslint-disable-next-line global-require
      store.replaceReducer(require('redux/modules/index').default)
    );
  }

  return store;
};
