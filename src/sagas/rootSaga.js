import { all } from 'redux-saga/effects'
import authSagas from './authSagas'
import homeSagas from './homeSagas'
import forgotPasswordSagas from './forgotPasswordSagas'

export default function* rootSaga() {
  yield all([
    authSagas(),
    homeSagas(),
    forgotPasswordSagas(),
  ])
}
