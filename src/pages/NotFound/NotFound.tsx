import React from 'react';
import { NavLink } from 'react-router-dom';

import { paths } from '../../routes/paths';

import './not-found.css';

export function NotFound() {
  return (
    <main>
      <h1>404</h1>
      <h2>Page not found</h2>
      <NavLink to={paths.main}>back to Main page</NavLink>
    </main>
  );
}
