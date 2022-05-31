import { getAccessToken } from 'axios-jwt';
import axios from 'axios';

const PORT = '';
const BASE_URL = `https://b3funky-pma-backend.herokuapp.com:${PORT}`;
axios.defaults.baseURL = BASE_URL;

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
  if (config?.headers) {
    config.headers['Content-type'] = 'application/json';
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }
  return config;
});
