import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { paths } from '../../routes/paths';

import { Header } from '../../components/Header';

import './board.css';

export function Board() {
  const { id } = useParams();
  return (
    <>
      <Header />
      <main className={'board-main'}>
        <h1>Board Page</h1>
        <NavLink to={paths.main}>back to Main page</NavLink>
      </main>
    </>
  );
}
