import React from 'react';
import { NavLink } from 'react-router-dom';

import { paths } from '../../routes/paths';

import { Header } from '../../components/Header';

import './main.css';

export function Main() {
  return (
    <>
      <Header />
      <main>
        <h1>Main Page</h1>
        <NavLink to={paths.board}>to Board page</NavLink>
      </main>
    </>
  );
}
