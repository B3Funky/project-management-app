// api.ts

import { getAccessToken } from 'axios-jwt';
import axios from 'axios';

const PORT = '4000';
const BASE_URL = `http://0.0.0.0:${PORT}`;
axios.defaults.baseURL = BASE_URL;

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  if (config?.headers) {
    config.headers['Content-type'] = 'application/json';
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = accessToken;
    }
  }
  return config;
});
