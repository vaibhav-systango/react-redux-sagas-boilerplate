import { all, call, put, takeLatest } from 'redux-saga/effects'
import { LOGIN_REQUEST, SIGNUP_REQUEST } from 'actions/Auth/actionTypes'
import {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure
} from 'actions/Auth'
import { postRequest } from './request'
import { pushNotification } from 'utils/notifications'
import { setInLocalStorage } from 'utils/helpers'
import history from 'utils/history'
import URls from 'constants/urls'
import Messages from 'constants/messages'

function* handleLogin(action) {
  const { data } = action.payload
  try {
    const response = yield call(postRequest, URls.LOGIN, data)
    console.log(response)
    if (response.data && response.data.token) {
      setInLocalStorage('token', response.data.token)
      yield put(loginSuccess(response.data))
      pushNotification(Messages.LOGIN_SUCCESS, 'success', 'TOP_CENTER', 1000)
      history.push('/')
    }
  } catch (error) {
    pushNotification(Messages.LOGIN_FAILED, 'error', 'TOP_CENTER', 1000)
    yield put(loginFailure())
  }
}

function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, handleLogin)
}

function* handleSignUp(action) {
  const { data } = action.payload
  try {
    const response = yield call(postRequest, URls.REGISTER, data)
    console.log(response)
    if (response.data && response.data.token) {
      setInLocalStorage('token', response.data.token)
      yield put(signupSuccess(response.data))
      pushNotification(Messages.REGISTER_SUCCESS, 'success', 'TOP_CENTER', 1000)
      history.push('/')
    }
  } catch (error) {
    pushNotification(Messages.REGISTER_FAILED, 'error', 'TOP_CENTER', 1000)
    yield put(signupFailure())
  }
}

function* watchSignupRequest() {
  yield takeLatest(SIGNUP_REQUEST, handleSignUp)
}


export default function* sagas() {
  yield all([
    watchLoginRequest(),
    watchSignupRequest()
  ])
}
