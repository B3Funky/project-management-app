import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Welcome } from '../pages/Welcome';
import { Login } from '../pages/Login';
import { SignUp } from '../pages/SignUp';
import { Main } from '../pages/Main';
import { Board } from '../pages/Board';
import { Profile } from '../pages/Profile';
import { NotFound } from '../pages/NotFound';
import { paths } from './paths';
import { checkAuth } from '../utils/check-auth';

export function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(navigate);
  }, []);

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
