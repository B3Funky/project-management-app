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
import { IBoardById, IColumn, IColumnById, ITask } from '../../models/api';

import './board.css';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { TaskSlice } from '../../store/reducers/TaskReducer';

const emptyBoard = {
  id: '',
  title: '',
  description: '',
  columns: [],
};

export function Board() {
  // const [columns, setColumns] = useState<IColumn[]>([]);
  const [board, setBoard] = useState<IBoardById>(emptyBoard);
  const [currentTasks, setCurrentTasks] = useState<ITask[]>([]);
  const [isColumnsLoad, setIsColumnsLoad] = useState<boolean>(false);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);

  const { id: boardId } = useParams();

  const dispatch = useAppDispatch();
  const { getCurrentBoard } = BoardSlice.actions;
  const { deleteColumn } = ColumnSlice.actions;
  const { taskColumns } = useAppSelector((state) => state.ColumnReducer);

  const getBoard = async () => {
    try {
      const board: IBoardById = await api.board.get({ boardId: boardId as string });
      // console.log(board);
      setBoard(board);
      setIsColumnsLoad(true);
    } catch (e) {
      // TODO Error Modal
      // TODO 404 - redirect 404 page
    }
  };

  // const getColumns = async () => {
  //   try {
  //     const columns: IColumn[] = await api.column.getAll({ boardId: boardId as string });
  //     setColumns(columns);
  //     setIsColumnsLoad(true);
  //   } catch (e) {
  //     // TODO Error Modal
  //   }
  // };

  const deleteColumnOnBackend = async (columnId: string) => {
    try {
      await api.column.delete({ boardId: board.id, columnId: columnId });
      const updatedBoard = Object.assign({}, board);
      updatedBoard.columns = updatedBoard.columns.filter((column) => column.id !== columnId);
      setBoard(updatedBoard);
    } catch (e) {
      // TODO Error Modal
    }
  };

  const handleCreateColumn = (data: IColumn) => {
    const newColumn: IColumnById = Object.assign({ tasks: [] }, data);
    const updatedBoard = Object.assign({}, board);
    updatedBoard.columns.push(newColumn);
    setBoard(updatedBoard);
  };

  const deleteCurrentColumn = (columnId: string) => {
    deleteColumnOnBackend(columnId).then();
    dispatch(deleteColumn(columnId));
  };

  useEffect(() => {
    getBoard().then();
    // getColumns().then();
    dispatch(getCurrentBoard(board.id));
  }, []);

  const getTasks = async (boardId: string, columnId: string) => {
    try {
      const tasks: ITask[] = await api.task.getAll({
        boardId: boardId as string,
        columnId: columnId,
      });
      setCurrentTasks(tasks);
      return tasks;
    } catch (e) {
      // TODO Error Modal
    }
  };

  const updateTask = async (
    data: ITaskDataUpdate,
    id: string,
    columnId: string,
    boardId: string
  ) => {
    try {
      await api.task.update({ boardId: boardId, columnId: columnId, taskId: id }, data);
      // getTasks(boardId, columnId);
      setCurrentTasks([]);
    } catch (e) {
      // TODO Error Modal
    }
  };

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = board.columns.filter((column) => column.id === source.droppableId)[0];
      const destColumn = board.columns.filter((column) => column.id === destination.droppableId)[0];
      let sourceItems: ITask[] | undefined;
      await getTasks(board.id, sourceColumn.id).then(
        (res) => (sourceItems = res?.sort((a, b) => a.order - b.order))
      );
      let destItems: ITask[] | undefined;
      await getTasks(board.id, destColumn.id).then(
        (res) => (destItems = res?.sort((a, b) => a.order - b.order))
      );
      const [removed] = sourceItems!.splice(source.index, 1);
      // destItems!.splice(destination.index, 0, removed);
      // destItems?.map((item, i) => (item.order = i + 1));
      removed.order = destination.index + 1;

      [removed].map(({ boardId, columnId, order, id, description, title, userId }) =>
        updateTask(
          { boardId, columnId: destColumn.id, description, order, title, userId },
          id,
          columnId,
          boardId
        )
      );
    } else {
      const column = board.columns.filter((column) => column.id === source.droppableId)[0];
      let copiedItems: ITask[] | undefined;
      await getTasks(board.id, column.id).then(
        (res) => (copiedItems = res?.sort((a, b) => a.order - b.order))
      );
      const [removed] = copiedItems!.splice(source.index, 1);
      // copiedItems!.splice(destination.index, 0, removed);
      // copiedItems?.map((item, i) => (item.order = i + 1));
      removed.order = destination.index + 1;

      [removed].map(({ boardId, columnId, order, id, description, title, userId }) =>
        updateTask({ boardId, columnId, description, order, title, userId }, id, columnId, boardId)
      );
    }
  };

  return (
    <>
      <Header />
      <main className={'board-main'}>
        {!isColumnsLoad ? (
          <Spinner />
        ) : (
          <>
            <NavLink to={paths.main}>back to Main page</NavLink>
            <h1>{board.title}</h1>
            <h4>{board.description}</h4>
            <DragDropContext onDragEnd={onDragEnd}>
              <Grid
                container
                overflow="auto"
                flexWrap="nowrap"
                alignItems="flex-start"
                height="75%"
              >
                {board.columns
                  .sort((a, b) => a.order - b.order)
                  .map(({ id, title, order }) => (
                    <TasksColumn
                      board={board}
                      id={id}
                      key={id}
                      title={title}
                      order={order}
                      onClick={() => deleteCurrentColumn(id)}
                      currentTasks={currentTasks}
                    />
                  ))}
                <ButtonComponent onClick={() => setIsModalActive(true)} sx={{ minWidth: '20vw' }}>
                  <Typography>Add new table</Typography>
                </ButtonComponent>
              </Grid>
            </DragDropContext>
          </>
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
