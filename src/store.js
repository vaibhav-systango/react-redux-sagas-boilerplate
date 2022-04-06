import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import persistState from 'redux-localstorage';
import rootReducer from 'reducers/rootReducer';
import rootSagas from 'sagas/rootSaga';

// Create sagas middleware
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      trace: true,
      traceLimit: 100,
    })) ||
  compose;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware), persistState('auth'))
  );
  // Running sagas
  sagaMiddleware.run(rootSagas);
  return store;
}
