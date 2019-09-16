import axios from 'axios'
import browserHistory from 'utils/history'
import { pushNotification } from 'utils/notifications'
import messages from 'constants/messages'
import env from 'utils/env_variables'

const axiosAuth = axios.create({
  baseURL: env.BASE_URL,
  withCredentials: false,
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})

axiosAuth.interceptors.response.use((response) => {
  // console.log(response)
  if (response.data.error) {
    return Promise.reject(response)
  }
  return response
}, (error) => {
  // console.log(error)
  if (error && error.response && error.response.status === 401) {
    localStorage.removeItem('token')
    pushNotification(messages.SESSION_EXPIRE, 'error')
    browserHistory.replace('/login')
  }
  return Promise.reject(error)
})

export default axiosAuth


