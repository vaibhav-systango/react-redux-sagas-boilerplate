import {
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_REQUEST_SUCCESS,
  SIGNUP_REQUEST_FAILURE,
  RESET_AUTH_STATE
} from './actionTypes'

export const login = (data) => ({
  type: LOGIN_REQUEST,
  payload: { data }
})

export const loginSuccess = (data) => ({
  type: LOGIN_REQUEST_SUCCESS,
  payload: { data }
})

export const loginFailure = () => ({
  type: LOGIN_REQUEST_FAILURE
})

export const signup = (data) => ({
  type: SIGNUP_REQUEST,
  payload: { data }
})

export const signupSuccess = (data) => ({
  type: SIGNUP_REQUEST_SUCCESS,
  payload: { data }
})

export const signupFailure = () => ({
  type: SIGNUP_REQUEST_FAILURE
})

export const resetAuthState = () => ({
  type: RESET_AUTH_STATE
})
