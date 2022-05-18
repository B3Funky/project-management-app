import { AxiosError } from 'axios';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../utils/login';

export const useSignup = (
  isFormFilled: boolean,
  setError: (arg0: string) => void,
  name: string,
  login: string,
  password: string
) => {
  const navigate = useNavigate();
  return useCallback(async () => {
    if (isFormFilled) {
      try {
        await signup({ name, login, password });
        navigate('/login');
      } catch (e) {
        if (e instanceof AxiosError) {
          setError(e?.response?.data?.message);
        }
      }
    }
  }, [isFormFilled, name, login, navigate, password, setError]);
};
