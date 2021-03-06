import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

import { SnackBarComponent, IErrorMessage } from '../SnackBar';
import { ButtonComponent } from '../Button';
import { TextAreaComponent } from '../TextAreaComponent';
import { Spinner } from '../Spinner';
import { TaskCard } from '../TaskCard';
import { CardFooter } from '../TaskColumnFooter';
import { CreateModal } from '../CreateModal';
import { ConfirmModal } from '../ConfirmModal';
import api, { ErrorResponse } from '../../utils/ApiBackend';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { TaskSlice } from '../../store/reducers/TaskReducer';
import { IBoardById, IColumn, ITask, ITaskCreate } from '../../models/api';

import './tasks-column.css';

export interface ITasksColumn extends IColumn {
  board: IBoardById;
  onClick?: () => void;
  dragProvider?: DroppableProvided;
  currentTasks?: ITask[];
}

export const TasksColumn = ({
  board,
  id,
  title,
  order,
  onClick,
  dragProvider,
  currentTasks,
}: ITasksColumn) => {
  const [columnOrder, setColumnOrder] = useState<number>(order);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isTasksLoad, setIsTasksLoad] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [changedText, setChangedText] = useState<string>('');
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);
  const [isConfirmModalActive, setIsConfirmModalActive] = useState(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<IErrorMessage | undefined>();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { deleteTask: deleteTaskTasks } = TaskSlice.actions;
  const { tasks: taskTasks } = useAppSelector((state) => state.TaskReducer);

  useEffect(() => {
    setChangedText(title);
    setCurrentTitle(title);
    getTasks().then();
  }, [currentTasks]);

  const submitTitle = () => {
    setCurrentTitle(changedText);
    updateColumn(changedText, columnOrder).then();
    setIsFocused(false);
  };

  const cancelTitle = () => {
    setChangedText(currentTitle);
    setIsFocused(false);
  };

  const updateColumn = async (title: string, order: number) => {
    try {
      const updatedColumn: IColumn = await api.column.update(
        { boardId: board.id, columnId: id },
        { title: title, order: order }
      );
      setColumnOrder(updatedColumn.order);
    } catch (e) {
      if (e instanceof ErrorResponse) {
        const errorMessage: IErrorMessage = Object.assign(
          { text: t('something_wrong'), severity: 'error' as const },
          e
        );
        setErrorMessage(errorMessage);
        setIsRequestError(true);
      }
    }
  };

  const getTasks = async () => {
    try {
      const tasks: ITask[] = await api.task.getAll({ boardId: board.id, columnId: id });
      setTasks(tasks);
      setIsTasksLoad(true);
    } catch (e) {
      if (e instanceof ErrorResponse) {
        const errorMessage: IErrorMessage = Object.assign(
          { text: t('something_wrong'), severity: 'error' as const },
          e
        );
        setErrorMessage(errorMessage);
        setIsRequestError(true);
      }
    }
  };

  const handleCreateTask = async (data: ITaskCreate) => {
    try {
      const newTask: ITask = await api.task.get({
        boardId: board.id,
        columnId: id,
        taskId: data.id,
      });

      const updatedTasks = tasks.slice();
      updatedTasks.push(newTask);
      setTasks(updatedTasks);
    } catch (e) {
      if (e instanceof ErrorResponse) {
        const errorMessage: IErrorMessage = Object.assign(
          { text: t('something_wrong'), severity: 'error' as const },
          e
        );
        setErrorMessage(errorMessage);
        setIsRequestError(true);
      }
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.task.delete({
        boardId: board.id,
        columnId: id,
        taskId: taskId,
      });
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (e) {
      if (e instanceof ErrorResponse) {
        const errorMessage: IErrorMessage = Object.assign(
          { text: t('something_wrong'), severity: 'error' as const },
          e
        );
        setErrorMessage(errorMessage);
        setIsRequestError(true);
      }
    }
  };

  const deleteCurrentTask = (taskId: string) => {
    deleteTask(taskId).then();
    dispatch(deleteTaskTasks(taskId));
  };

  return (
    <>
      <SnackBarComponent
        isOpen={Boolean(isRequestError)}
        setIsOpen={setIsRequestError}
        message={errorMessage}
      ></SnackBarComponent>
      <Card className="column" sx={{ bgcolor: '#c4e7f0' }}>
        <IconButton
          onClick={() => setIsConfirmModalActive(true)}
          sx={{ position: 'absolute', top: '0', right: '0', padding: '2px' }}
        >
          <CancelIcon fontSize="medium" sx={{ color: '#cd5d5d' }} />
        </IconButton>
        <CardHeader
          style={{ padding: '10px', flexDirection: 'row-reverse' }}
          titleTypographyProps={{
            fontSize: '1rem',
            textAlign: 'left',
            width: '100%',
          }}
          classes={{ action: 'column__action' }}
          action={
            <Grid display="flex" alignItems="center" sx={{ marginTop: '7px' }}>
              <Box>
                <ButtonComponent
                  className={`column__button ${isFocused ? 'isFocused' : ''}`}
                  onClick={submitTitle}
                >
                  <CheckIcon sx={{ fontSize: '15px' }} />
                </ButtonComponent>
                <ButtonComponent
                  className={`column__button ${isFocused ? 'isFocused' : ''}`}
                  onClick={cancelTitle}
                >
                  <CancelIcon sx={{ fontSize: '15px' }} />
                </ButtonComponent>
              </Box>
            </Grid>
          }
          title={
            <>
              <TextAreaComponent
                value={changedText}
                className="column__title"
                onFocus={() => setIsFocused(true)}
                onChange={(e) => setChangedText(e.currentTarget.value)}
              />
            </>
          }
        />
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, height: '84%', padding: '0 10px' }}>
          {!isTasksLoad ? (
            <Spinner />
          ) : (
            <Droppable droppableId={id} key={id}>
              {(provided) => (
                <Grid
                  container
                  height="100%"
                  overflow="auto"
                  alignItems="center"
                  flexDirection="column"
                  flexWrap="nowrap"
                  {...provided?.droppableProps}
                  ref={provided?.innerRef}
                  sx={{ bgcolor: 'rgba(120,168,181,0.3)', borderRadius: '4px' }}
                >
                  {tasks
                    .sort((a, b) => a.order - b.order)
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided, snapshot) => (
                          <>
                            <TaskCard
                              {...task}
                              id={task.id}
                              key={task.id}
                              deleteTask={() => deleteCurrentTask(task.id)}
                              dragProvider={provided}
                              dragSnapShot={snapshot}
                            />
                          </>
                        )}
                      </Draggable>
                    ))}
                </Grid>
              )}
            </Droppable>
          )}
        </CardContent>
        <CardFooter>
          <ButtonComponent type="button" onClick={() => setIsCreateModalActive(true)}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <AddIcon fontSize="small" />
              <Typography fontSize="0.7rem" variant="body1">
                {t('create_task')}
              </Typography>
            </Box>
          </ButtonComponent>
        </CardFooter>
      </Card>

      <CreateModal
        isActive={isCreateModalActive}
        setActive={setIsCreateModalActive}
        thing="Task"
        columnId={id}
        onCreateCallback={handleCreateTask}
      />
      <ConfirmModal
        active={isConfirmModalActive}
        setActive={setIsConfirmModalActive}
        confirmAction={() => (onClick ? onClick() : null)}
      >
        <div>{t('agree_delete_column')}</div>
      </ConfirmModal>
    </>
  );
};
