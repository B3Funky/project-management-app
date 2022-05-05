import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Welcome } from '../pages/Welcome';
import { Login } from '../pages/Login';
import { Main } from '../pages/Main';
import { paths } from './paths';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={paths.welcome} element={<Welcome />} />
      <Route path={paths.login} element={<Login />} />
      <Route path={paths.main} element={<Main />} />
    </Routes>
  );
}
