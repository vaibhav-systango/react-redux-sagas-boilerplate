import {
  FORGOT_PASSWORD_INITIATE_REQUEST,
  FORGOT_PASSWORD_INITIATE_REQUEST_SUCCESS,
  FORGOT_PASSWORD_INITIATE_REQUEST_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_FAILURE
} from './actionTypes'

export const initiateForgotPassword = (email) => ({
  type: FORGOT_PASSWORD_INITIATE_REQUEST,
  payload: { email }
})

export const initiateForgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_INITIATE_REQUEST_SUCCESS
})

export const initiateForgotPasswordFailure = () => ({
  type: FORGOT_PASSWORD_INITIATE_REQUEST_FAILURE
})

export const resetPassword = (data) => ({
  type: RESET_PASSWORD_REQUEST,
  payload: { data }
})

export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_REQUEST_SUCCESS
})

export const resetPasswordFailure = () => ({
  type: RESET_PASSWORD_REQUEST_FAILURE
})
