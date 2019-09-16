import axios from 'axios'

const axiosFactory = params => axios.create({
  headers: {
    'X-locale': (params && params.locale) || (process.browser && window.localStorage.getItem('locale')) || 'GB',
    'X-currency': (params && params.currency) || (process.browser && window.localStorage.getItem('currency')) || 'USD'
  }
})

export default {
  instance: axiosFactory(),
  recreate(payload) {
    this.instance = axiosFactory(payload)
  }
}
