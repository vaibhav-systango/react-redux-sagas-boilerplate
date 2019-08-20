import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import rootReducer from 'reducers/rootReducer';

const composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
	trace: true,
	traceLimit: 100
})) || compose

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(
    thunk,
    promise,
  ),
  persistState('auth'),
  window.REDUX_DEVTOOLS_EXTENSION ? window.devToolsExtension() : f => f,
)(createStore);

export default function configureStore() {
  const store = createStoreWithMiddleware(rootReducer);
  return store;
}
