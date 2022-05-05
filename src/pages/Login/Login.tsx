import React from 'react';
import { NavLink } from 'react-router-dom';

import { paths } from '../../routes/paths';

import './login.css';

export function Login() {
  return (
    <main>
      <h1>
        Login / Sign up
        <br /> Page
      </h1>
      <NavLink to={paths.main}>to Main page</NavLink>
    </main>
  );
}
