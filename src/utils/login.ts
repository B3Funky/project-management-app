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
  const response = await axiosInstance.post('/signup', params);
};

export const signout = () => {
  clearAuthTokens();
  localStorage.setItem('login', '');
  localStorage.setItem('password', '');
};

const getUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response?.data;
};

export const deleteUser = async () => {
  const currentLogin = localStorage.getItem('login');
  const users = await getUsers();
  const currentUserId = users?.find((user: { login?: string }) => user?.login === currentLogin)?.id;
  if (currentUserId) {
    await axiosInstance.delete(`/users/${currentUserId}`);
    signout();
  }
};
