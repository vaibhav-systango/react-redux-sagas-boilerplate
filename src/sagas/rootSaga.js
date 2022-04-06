import { all } from 'redux-saga/effects';
import authSagas from './authSagas';

export default function* rootSaga() {
  yield all([authSagas()]);
}
