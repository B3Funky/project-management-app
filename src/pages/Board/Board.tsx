import React from 'react';

import { Header } from '../../components/Header';

import './board.css';
import { TasksColumn } from '../../components/TasksColumn';

export function Board() {
  return (
    <>
      <Header />
      <main className="board-main">
        <TasksColumn title="Title" />
      </main>
    </>
  );
}
