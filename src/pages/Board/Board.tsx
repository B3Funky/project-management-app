import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import { paths } from '../../routes/paths';

import { Header } from '../../components/Header';

import './board.css';
import { TasksColumn } from '../../components/TasksColumn';
import { Grid, Typography } from '@mui/material';
import { ButtonComponent } from '../../components/Button';
import { ITasksColumn } from '../../components/TasksColumn/TasksColumn';
import { ModalComponent } from '../../components/Modal';
import { InputComponent } from '../../components/Input';
import { IS_EMPTY_REGEXP } from '../../constants';
import { IFieldValidMethod } from '../Main/Main';
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
  const [isCreateColumnModalActive, setIsCreateColumnModalActive] = useState(false);
  const [columnTitle, setColumnTitle] = useState('');
  const [columnDescription, setColumnDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(true);
  const [columns, setColumns] = useState<ITasksColumn[]>([
    { title: '1', description: '', id: 1 },
    { title: '2', description: '', id: 2 },
  ]);

  useEffect(() => {
    columnTitle && columnDescription && !titleError && !descriptionError
      ? setIsFormDisabled(false)
      : setIsFormDisabled(true);
  }, [columnTitle, columnDescription]);

  const isFieldValid = ({ errorText, method, regexp, value }: IFieldValidMethod) => {
    regexp?.test(value) ? method(errorText) : method('');
  };

  const addTable = () => {
    setColumns([
      ...columns,
      { title: columnTitle, description: columnDescription, id: Date.now() },
    ]);
    setIsCreateColumnModalActive(false);
    setColumnTitle('');
    setColumnDescription('');
  };

  const deleteTable = (id: number) => {
    setColumns(columns.filter((column) => table.id !== id));
  };

  return (
    <>
      <Header />
      <main className={'board-main'}>
        <h1>Board Page</h1>
        <NavLink to={paths.main}>back to Main page</NavLink>
        <Grid container overflow="auto" flexWrap="nowrap" alignItems="flex-start" height="75%">
          {columns.map(({ description, id, title }) => (
            <TasksColumn
              title={title}
              description={description}
              id={id}
              key={id}
              onClick={() => deleteTable(id)}
            />
          ))}
          <ButtonComponent
            onClick={() => setIsCreateColumnModalActive(true)}
            sx={{ minWidth: '20vw' }}
          >
            <Typography>Add new table</Typography>
          </ButtonComponent>
        </Grid>
        <ModalComponent active={isCreateColumnModalActive} setActive={setIsCreateColumnModalActive}>
          <form onSubmit={addTable}>
            <Grid container flexDirection="column" alignItems="center">
              <Grid>
                <Typography>Add Board Title</Typography>
                <InputComponent
                  errorText={titleError}
                  onChange={(e) => {
                    setColumnTitle(e.target.value);
                    isFieldValid({
                      value: e.target.value,
                      errorText: 'Field should be fill',
                      method: setTitleError,
                      regexp: IS_EMPTY_REGEXP,
                    });
                  }}
                />
              </Grid>
              <Grid>
                <Typography>Add Board Description</Typography>
                <InputComponent
                  errorText={descriptionError}
                  onChange={(e) => {
                    setColumnDescription(e.target.value);
                    isFieldValid({
                      value: e.target.value,
                      errorText: 'Field should be fill',
                      method: setDescriptionError,
                      regexp: IS_EMPTY_REGEXP,
                    });
                  }}
                />
              </Grid>
              <ButtonComponent isDisabled={isFormDisabled} type="submit" variant="contained">
                <Typography>Create Table</Typography>
              </ButtonComponent>
            </Grid>
          </form>
        </ModalComponent>
      </main>
    </>
  );
}
