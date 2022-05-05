import React from 'react';
import { NavLink } from 'react-router-dom';

import { paths } from '../../routes/paths';

import './welcome.css';

export function Welcome() {
  return (
    <>
      <header className={'welcome-header'}>
        <NavLink to={paths.login}>Login</NavLink>
        <NavLink to={paths.login}>Sign up</NavLink>
      </header>
      <main>
        <h1>Welcome Page</h1>
      </main>
    </>
  );
}
