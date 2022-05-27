import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { paths } from '../../routes/paths';

import { Header } from '../../components/Header';

import './board.css';
import { TasksColumn } from '../../components/TasksColumn';
import { Grid, Typography } from '@mui/material';
import { ButtonComponent } from '../../components/Button';

import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { BoardSlice } from '../../store/reducers/BoardReducer';
import { CreateModal } from '../../components/CreateModal';
import { ColumnSlice } from '../../store/reducers/ColumnReducer';

export function Board() {
  const { id } = useParams();
  const { taskColumns } = useAppSelector((state) => state.ColumnReducer);
  const { getCurrentBoard } = BoardSlice.actions;
  const { deleteColumn } = ColumnSlice.actions;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentBoard(String(id)));
  }, []);
  const [isModalActive, setIsModalActive] = useState(false);

  const deleteCurrentColumn = (id: number) => {
    dispatch(deleteColumn(id));
  };

  return (
    <>
      <Header />
      <main className={'board-main'}>
        <h1>Board Page</h1>
        <NavLink to={paths.main}>back to Main page</NavLink>
        <Grid container overflow="auto" flexWrap="nowrap" alignItems="flex-start" height="75%">
          {taskColumns.map(({ description, id, title }) => (
            <TasksColumn
              title={title}
              description={description}
              id={id}
              key={id}
              onClick={() => deleteCurrentColumn(id)}
            />
          ))}
          <ButtonComponent onClick={() => setIsModalActive(true)} sx={{ minWidth: '20vw' }}>
            <Typography>Add new table</Typography>
          </ButtonComponent>
        </Grid>
      </main>
      <CreateModal isActive={isModalActive} setActive={setIsModalActive} thing="Column" />
    </>
  );
}
