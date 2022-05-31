import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { getAccessToken } from 'axios-jwt';

import { Welcome } from '../pages/Welcome';
import { Login } from '../pages/Login';
import { SignUp } from '../pages/SignUp';
import { Main } from '../pages/Main';
import { Board } from '../pages/Board';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';
import { paths } from './paths';
import checkAuth from '../utils/checkAuth';

export function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (location.pathname !== paths.welcome) {
      if (!accessToken) {
        if (location.pathname !== paths.login && location.pathname !== paths.signUp) {
          navigate(paths.welcome);
        }
      } else {
        checkAuth().then((isAuth) => {
          if (isAuth) {
            if (location.pathname === paths.login || location.pathname === paths.signUp) {
              navigate(paths.main);
            }
          } else if (location.pathname !== paths.login && location.pathname !== paths.signUp) {
            navigate(paths.welcome);
          }
        });
      }
    }
  }, [accessToken, location.pathname, navigate]);

  return (
    <Routes>
      <Route path={paths.welcome} element={<Welcome />} />
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.signUp} element={<SignUp />} />
      <Route path={paths.main} element={<Main />} />
      <Route path={paths.board} element={<Board />} />
      <Route path={paths.profile} element={<Profile />} />
      <Route path={paths.notFound} element={<NotFound />} />
    </Routes>
  );
}
