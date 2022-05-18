import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { signin } from '../utils/login';

export const useLogin = (isFormFilled: boolean, login: string, password: string) => {
  const navigate = useNavigate();
  return useCallback(async () => {
    if (isFormFilled) {
      try {
        await signin({ login, password });
        navigate('/main');
      } catch (e) {
        console.log(e);
      }
    }
  }, [isFormFilled, login, password]);
};
