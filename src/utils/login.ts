import { isLoggedIn, setAuthTokens, clearAuthTokens, getAccessToken } from 'axios-jwt';
import { axiosInstance } from './api';

// 4. Post email and password and get tokens in return. Call setAuthTokens with the result.
export const signin = async (params: { login: string; password: string }) => {
  const response = await axiosInstance.post('/signin', params);

  setAuthTokens({
    accessToken: response.data.token,
    refreshToken: '',
  });
};

export const signup = async (params: { name: string; login: string; password: string }) => {
  const response = await axiosInstance.post('/signup', params);
};

const signout = () => clearAuthTokens();

if (isLoggedIn()) {
}

// Get access to tokens
const accessToken = getAccessToken();
