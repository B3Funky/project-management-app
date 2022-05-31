import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { signin } from './login';

export async function checkAuth(navigate: NavigateFunction) {
  const storageLogin = localStorage.getItem('login');
  const storagePassword = localStorage.getItem('password');
  if (storageLogin && storagePassword) {
    try {
      await signin({ login: storageLogin, password: storagePassword });
      if (window.location.pathname === '/') {
        navigate('/main');
      }
    } catch (e) {
      if (axios.isAxiosError(e) && e?.response?.status === 403) {
        navigate('/');
      }
    }
  }
}
