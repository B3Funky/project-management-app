import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';

import { Header } from '../../components/Header';
import { Spinner } from '../../components/Spinner';
import { TasksColumn } from '../../components/TasksColumn';
import { ButtonComponent } from '../../components/Button';
import { CreateModal } from '../../components/CreateModal';
import api, { ITaskDataUpdate } from '../../utils/ApiBackend';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { BoardSlice } from '../../store/reducers/BoardReducer';
import { ColumnSlice } from '../../store/reducers/ColumnReducer';
import { paths } from '../../routes/paths';
import { IColumn, ITask } from '../../models/api';

import './board.css';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

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
      const columns: IColumn[] = await api.column.getAll({ boardId: id as string });
      setColumns(columns);
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

  const handleCreateColumn = (data: IColumn) => {
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

  const [currentTasks, setCurrentTasks] = useState<ITask[]>([]);

  const getTasks = async (boardId: string, columnId: string) => {
    try {
      const tasks: ITask[] = await api.task.getAll({
        boardId: boardId as string,
        columnId: columnId,
      });
      return tasks;
      // setCurrentTasks(tasks);
    } catch (e) {
      // TODO Error Modal
    }
  };

  const updateTaskTitle = async (data: ITaskDataUpdate, id: string) => {
    try {
      await api.task.update({ boardId: data.boardId, columnId: data.columnId, taskId: id }, data);
    } catch (e) {
      // TODO Error Modal
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns.filter((column) => column.id === source.droppableId)[0];
      const destColumn = columns.filter((column) => column.id === destination.droppableId)[0];
      let sourceItems: ITask[] | undefined;
      if (id) {
        await getTasks(id, sourceColumn.id).then((res) => (sourceItems = res));
      }
      let destItems: ITask[] | undefined;
      if (id) {
        await getTasks(id, destColumn.id).then((res) => (destItems = res));
      }
      const [removed] = sourceItems!.splice(source.index, 1);
      destItems!.splice(destination.index, 0, removed);
      destItems?.map((item, i) => (item.order = i + 1));
      console.log(destItems);
      destItems?.map(({ boardId, columnId, order, id, description, title, userId }) =>
        updateTaskTitle({ boardId, columnId, description, order, title, userId }, id)
      );
    } else {
      const column = columns.filter((column) => column.id === source.droppableId)[0];
      let copiedItems: ITask[] | undefined;
      if (id) {
        await getTasks(id, column.id).then((res) => (copiedItems = res));
      }
      const [removed] = copiedItems!.splice(source.index, 1);
      copiedItems!.splice(destination.index, 0, removed);
      copiedItems?.map((item, i) => (item.order = i + 1));
      console.log(copiedItems);
      copiedItems?.map(({ boardId, columnId, order, id, description, title, userId }) =>
        updateTaskTitle({ boardId, columnId, description, order, title, userId }, id)
      );
    }
  };

  return (
    <>
      <Header />
      <main className={'board-main'}>
        <h1>Board Page</h1>
        <NavLink to={paths.main}>back to Main page</NavLink>
        {!isColumnsLoad ? (
          <Spinner />
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Grid container overflow="auto" flexWrap="nowrap" alignItems="flex-start" height="75%">
              {columns
                .sort((a, b) => a.order - b.order)
                .map(({ id, title, order }) => (
                  <Droppable droppableId={id} key={id}>
                    {(provided) => (
                      <TasksColumn
                        id={id}
                        key={id}
                        title={title}
                        order={order}
                        onClick={() => deleteCurrentColumn(id)}
                        dragProvider={provided}
                      />
                    )}
                  </Droppable>
                ))}
              <ButtonComponent onClick={() => setIsModalActive(true)} sx={{ minWidth: '20vw' }}>
                <Typography>Add new table</Typography>
              </ButtonComponent>
            </Grid>
          </DragDropContext>
        )}
      </main>
      <CreateModal
        isActive={isModalActive}
        setActive={setIsModalActive}
        thing="Column"
        onCreateCallback={handleCreateColumn}
      />
    </>
  );
}
