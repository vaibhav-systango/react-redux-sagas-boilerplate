import api from 'service/api';

export const getRequest = async (requestUrl) =>
  api
    .get(requestUrl)
    .then((resp) => resp)
    .catch((error) => error.response);

export const postRequest = async (requestUrl, data) =>
  api
    .post(requestUrl, data)
    .then((resp) => resp)
    .catch((error) => error.response);

export const postFormDataRequest = async (requestUrl, data) => {
  const formData = new FormData();
  Object.keys(data).map((item) => formData.set(item, data[item]));
  return api
    .post(requestUrl, formData)
    .then((resp) => resp)
    .catch((error) => error.response);
};
