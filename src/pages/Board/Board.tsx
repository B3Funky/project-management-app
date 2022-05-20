import React from 'react';
import { NavLink } from 'react-router-dom';

import { paths } from '../../routes/paths';

import { Header } from '../../components/Header';

import './board.css';
import { TasksColumn } from '../../components/TasksColumn';

export function Board() {
  return (
    <>
      <Header />
      <main className={'board-main'}>
        <h1>Board Page</h1>
        <NavLink to={paths.main}>back to Main page</NavLink>
        <TasksColumn title="Title 1" />
      </main>
    </>
  );
}
