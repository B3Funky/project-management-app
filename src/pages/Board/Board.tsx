import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

import { Header } from '../../components/Header';
import { Spinner } from '../../components/Spinner';
import { TasksColumn } from '../../components/TasksColumn';
import { ButtonComponent } from '../../components/Button';
import { CreateModal } from '../../components/CreateModal';
import api from '../../utils/ApiBackend';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { BoardSlice } from '../../store/reducers/BoardReducer';
import { ColumnSlice } from '../../store/reducers/ColumnReducer';
import { paths } from '../../routes/paths';
import { IColumn } from '../../models/api';

import './board.css';

export function Board() {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [isColumnsLoad, setIsColumnsLoad] = useState<boolean>(false);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { getCurrentBoard } = BoardSlice.actions;
  const { deleteColumn } = ColumnSlice.actions;
  const { taskColumns } = useAppSelector((state) => state.ColumnReducer);

  const getColumns = async () => {
    try {
      const res: IColumn[] = await api.column.getAll({ boardId: id as string });
      setColumns(res);
      setIsColumnsLoad(true);
    } catch (e) {
      // TODO Error Modal
    }
  };

  const deleteColumnOnBackend = async (columnId: string) => {
    try {
      await api.column.delete({ boardId: id as string, columnId: columnId });
      const updatedColumns = columns.filter((column) => column.id !== columnId);
      setColumns(updatedColumns);
    } catch (e) {
      // TODO Error Modal
    }
  };

  const handleUpdateColumn = (data: IColumn) => {
    const updatedColumns = columns.slice();
    updatedColumns.push(data);
    setColumns(updatedColumns);
  };

  const deleteCurrentColumn = (id: string) => {
    deleteColumnOnBackend(id).then();
    dispatch(deleteColumn(id));
  };

  useEffect(() => {
    getColumns().then();
    if (id) {
      dispatch(getCurrentBoard(id));
    }
  }, []);

  return (
    <>
      <Header />
      <main className={'board-main'}>
        <h1>Board Page</h1>
        <NavLink to={paths.main}>back to Main page</NavLink>
        {!isColumnsLoad ? (
          <Spinner />
        ) : (
          <Grid container overflow="auto" flexWrap="nowrap" alignItems="flex-start" height="75%">
            {columns.map(({ id, title, order }) => (
              <TasksColumn
                id={id}
                key={id}
                title={title}
                order={order}
                onClick={() => deleteCurrentColumn(id)}
              />
            ))}
            <ButtonComponent onClick={() => setIsModalActive(true)} sx={{ minWidth: '20vw' }}>
              <Typography>Add new table</Typography>
            </ButtonComponent>
          </Grid>
        )}
      </main>
      <CreateModal
        isActive={isModalActive}
        setActive={setIsModalActive}
        thing="Column"
        onUpdateParentComponent={handleUpdateColumn}
      />
    </>
  );
}
