import api from 'service/api'

export const getRequest = async (requestUrl, cancelToken) =>
  api.get(requestUrl, { cancelToken })

export const postRequest = async (requestUrl, data) =>
  api.post(requestUrl, data)

export const postFormDataRequest = async (requestUrl, data) => {
  const formData = new FormData()
  Object.keys(data).map(item => formData.set(item, data[item]))
  return api.post(requestUrl, formData)
}
