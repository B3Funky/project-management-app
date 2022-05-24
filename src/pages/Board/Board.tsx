import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { paths } from '../../routes/paths';

import { Header } from '../../components/Header';

import './board.css';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { BoardSlice } from '../../store/reducers/BoardReducer';

export function Board() {
  const { id } = useParams();
  const { taskColumns, taskBoards, currentBoard } = useAppSelector((state) => state.BoardReducer);
  const { getCurrentBoard } = BoardSlice.actions;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentBoard(Number(id)));
  }, []);

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
