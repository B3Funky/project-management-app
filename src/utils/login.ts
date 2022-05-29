import { setAuthTokens, clearAuthTokens } from 'axios-jwt';
import { axiosInstance } from './api';

export const signin = async (params: { login: string; password: string }) => {
  const response = await axiosInstance.post('/signin', params);
  setAuthTokens({
    accessToken: response.data.token,
    refreshToken: '',
  });
};

export const signup = async (params: { name: string; login: string; password: string }) => {
  await axiosInstance.post('/signup', params);
};

export const signout = () => {
  clearAuthTokens();
  localStorage.removeItem('userId');
};

export const deleteUser = async () => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    await axiosInstance.delete(`/users/${userId}`);
    signout();
  }
};
