import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../utils/login';
import api from '../utils/ApiBackend';

export const useLogin = (
  isFormFilled: boolean,
  setError: (arg0: string) => void,
  login: string,
  password: string
) => {
  const navigate = useNavigate();
  return useCallback(async () => {
    if (isFormFilled) {
      try {
        await signin({ login, password });

        const users = await api.user.getAll();
        users.map((user) => {
          if (user.login === login) {
            localStorage.setItem('userId', user.id); // TODO if no match?
          }
        });

        navigate('/main');
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(e?.response?.data?.message);
        }
      }
    }
  }, [isFormFilled, login, navigate, password, setError]);
};
