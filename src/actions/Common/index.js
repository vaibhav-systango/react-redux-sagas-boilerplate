import {
  UPDATE_REDUCER_STATE
} from './actionTypes'

export const updateReducerState = (reducerKey, key, value) => ({
  type: UPDATE_REDUCER_STATE,
  payload: { reducerKey, key, value }
})

