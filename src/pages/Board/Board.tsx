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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    // if (source.droppableId !== destination.droppableId) {
    //   const sourceColumn = columns[Number(source.droppableId)];
    //   const destColumn = columns[Number(destination.droppableId)];
    //   const sourceItems = [...sourceColumn];
    //   const destItems = [...destColumn];
    //   const [removed] = sourceItems.splice(source.index, 1);
    //   destItems.splice(destination.index, 0, removed);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...sourceColumn,
    //       items: sourceItems,
    //     },
    //     [destination.droppableId]: {
    //       ...destColumn,
    //       items: destItems,
    //     },
    //   });
    // } else {
    //   const column = columns[Number(source.droppableId)];
    //   const copiedItems = [column];
    //   const [removed] = copiedItems.splice(source.index, 1);
    //   copiedItems.splice(destination.index, 0, removed);
    //   setColumns({
    //     ...columns,
    //     [source.droppableId]: {
    //       ...column,
    //       items: copiedItems,
    //     },
    //   });
    // }
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
            <Droppable droppableId="column1" key={id}>
              {(provided) => (
                <Grid
                  container
                  overflow="auto"
                  flexWrap="nowrap"
                  alignItems="flex-start"
                  height="75%"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="column1"
                >
                  {columns
                    .sort((a, b) => a.order - b.order)
                    .map(({ id, title, order }) => (
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
            </Droppable>
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
