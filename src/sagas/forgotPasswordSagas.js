import { all, call, put, takeLatest } from 'redux-saga/effects'
import { FORGOT_PASSWORD_INITIATE_REQUEST, RESET_PASSWORD_REQUEST } from 'actions/ForgotPassword/actionTypes'
import {
  initiateForgotPasswordSuccess,
  initiateForgotPasswordFailure,
  resetPasswordSuccess,
  resetPasswordFailure
} from 'actions/ForgotPassword'
import { getRequest, postRequest } from './request'
import { pushNotification } from 'utils/notifications'
import history from 'utils/history'
import URls from 'constants/urls'
import Messages from 'constants/messages'

function* handleForgotPassword(action) {
  const { email } = action.payload
  try {
    const url = `${URls.FORGOT_PASSWORD}/${email}`
    const response = yield call(getRequest, url)
    if (response.data && response.data.message) {
      yield put(initiateForgotPasswordSuccess())
      pushNotification(response.data.message, 'success', 'TOP_CENTER', 3000)
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      pushNotification(error.response.data.message, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(Messages.FORGOT_PASSWORD_FAILED, 'error', 'TOP_CENTER', 3000)
    }
    yield put(initiateForgotPasswordFailure())
  }
}

function* watchForgotPasswordRequest() {
  yield takeLatest(FORGOT_PASSWORD_INITIATE_REQUEST, handleForgotPassword)
}

function* handleResetPassword(action) {
  const { data } = action.payload
  try {
    const response = yield call(postRequest, URls.RESET_PASSWORD, data)
    if (response.data && response.data.success) {
      yield put(resetPasswordSuccess())
      pushNotification(response.data.message, 'success', 'TOP_CENTER', 3000)
      history.push('/login')
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      pushNotification(error.response.data.message, 'error', 'TOP_CENTER', 3000)
    } else {
      pushNotification(Messages.RESET_PASSWORD_FAILED, 'error', 'TOP_CENTER', 3000)
    }
    yield put(resetPasswordFailure())
  }
}

function* watchResetPasswordRequest() {
  yield takeLatest(RESET_PASSWORD_REQUEST, handleResetPassword)
}


export default function* sagas() {
  yield all([
    watchForgotPasswordRequest(),
    watchResetPasswordRequest()
  ])
}
