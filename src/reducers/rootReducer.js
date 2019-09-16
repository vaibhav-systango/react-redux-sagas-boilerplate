import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import homeReducer from './homeReducer'
import forgotPasswordReducer from './forgotPasswordReducer'

const appReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  home: homeReducer,
  forgotPassword: forgotPasswordReducer,
})


const rootReducer = (state, action) => {
  console.log(action, 'check the main key here')
  if (action.type === 'RESET_AUTH_STATE') {
    state = {
      ...state,
      auth: {
        ...state.auth,
        user: {
          id: null,
          firstName: null,
          lastName: null,
          profileImage: null,
          preferredCurrency: null,
          country: null
        }
      }
    }
  }
  else if (action.type === 'UPDATE_REDUCER_STATE') {
    if (action.payload.reducerKey && action.payload.key && action.payload.value) {
      const { reducerKey, key, value } = action.payload
      state = {
        ...state,
        [reducerKey]: {
          ...state[reducerKey],
          [key]: value
        }
      }
    }
  }
  return appReducer(state, action)
}

export default rootReducer
