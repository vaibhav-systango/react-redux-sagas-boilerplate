import api from 'service/api';

export function interceptor() {
  const localToken = localStorage.getItem('token');
  api.interceptors.request.use((config) => {
    if (localToken) {
      config.headers.Authorization = `JWT ${localToken}`;
    }
    return config;
  });
}
