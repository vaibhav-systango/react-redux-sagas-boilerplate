import axios, { CancelToken } from 'axios'
import env from 'utils/env_variables'


class AuthService {
  constructor() {
    this.accessToken = this.getToken('token')
    this.axios = this.axiosInit()
    this.CancelToken = CancelToken
  }

  axiosInit = () => axios.create({
    baseURL: env.BASE_URL,
    headers: {
      'x-access-token': this.accessToken,
      authorization: `Bearer ${this.accessToken}`
    }
  })

  getToken(key) {
    return localStorage.getItem(key)
  }

  isLoggedIn() {
    const token = this.getToken('token')
    if (token) return true
    return false
  }

  // googleLoginSuccess = async (googleResponse) => {
  //   const { tokenId: token } = googleResponse
  //   const url = `${API_URL}/users/oauth/google`
  //   const params = { token }

  //   try {
  //     const response = await axios.post(url, params)
  //     if (response.data && response.data.status === 'SUCCESS' && response.data.payload && response.data.payload.loginToken) {
  //       const { loginToken } = response.data.payload
  //       this.setToken('access_token', loginToken)
  //       this.axios = this.axiosInit()
  //       this.getUserProfile()
  //       Router.replace('/')
  //     } else {
  //       throw new Error('Something went wrong, Either data is not present or Api might have changed!')
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     throw error
  //   }
  // }

  // facebookLoginSuccess = async (facebookResponse) => {
  //   const { accessToken: token, name, email, picture: { data: { url: profileImage } } } = facebookResponse
  //   const url = `${API_URL}/users/oauth/facebook`
  //   const params = {
  //     token,
  //     email,
  //     profileImage,
  //     firstName: name.split(' ')[0] || '',
  //     lastName: name.split(' ')[name.split(' ').length - 1] || ''
  //   }

  //   try {
  //     const response = await axios.post(url, params)
  //     if (response.data && response.data.status === 'SUCCESS' && response.data.payload && response.data.payload.loginToken) {
  //       const { loginToken } = response.data.payload
  //       this.setToken('access_token', loginToken)
  //       this.axios = this.axiosInit()
  //       this.getUserProfile()
  //       Router.replace('/')
  //     } else {
  //       throw new Error('Something went wrong, Either data is not present or Api might have changed!')
  //     }
  //   } catch (error) {
  //     throw error
  //   }
  // }

  // logout() {
  //   window.localStorage.removeItem('access_token')
  //   this.accessToken = null
  //   this.axios = this.axiosInit()

  //   // const { id } = this.getUser()
  //   // const refreshToken = this.getToken('refresh_token')
  //   // window.localStorage.removeItem('access_token')
  //   // window.localStorage.removeItem('refresh_token')
  //   // return this.axios({
  //   //   method: 'post',
  //   //   url: `${API_URL}${this.logoutRoute}`,
  //   //   data: { id, refreshToken },
  //   // })
  // }

}

export default new AuthService()
