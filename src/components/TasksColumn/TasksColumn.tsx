import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';

import { ButtonComponent } from '../Button';
import { TextAreaComponent } from '../TextAreaComponent';
import { Spinner } from '../Spinner';
import { TaskCard } from '../TaskCard';
import { CardFooter } from '../TaskColumnFooter';
import { CreateModal } from '../CreateModal';
import { ConfirmModal } from '../ConfirmModal';
import api from '../../utils/ApiBackend';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { TaskSlice } from '../../store/reducers/TaskReducer';
import { IColumn, ITask, ITaskCreate } from '../../models/api';

import './tasks-column.css';

export interface ITasksColumn extends IColumn {
  onClick?: () => void;
}

export const TasksColumn = ({ id, title, order, onClick }: ITasksColumn) => {
  const [columnOrder, setColumnOrder] = useState<number>(order);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isTasksLoad, setIsTasksLoad] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const [currentTitle, setCurrentTitle] = useState<string>('');
  const [changedText, setChangedText] = useState<string>('');
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);
  const [isConfirmModalActive, setIsConfirmModalActive] = useState(false);

  const { id: boardId } = useParams();

  const dispatch = useAppDispatch();
  const { deleteTask: deleteTaskTasks } = TaskSlice.actions;
  const { tasks: taskTasks } = useAppSelector((state) => state.TaskReducer);

  useEffect(() => {
    setChangedText(title);
    setCurrentTitle(title);
    getTasks().then();
  }, []);

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
        { boardId: boardId as string, columnId: id },
        { title: title, order: order }
      );
      setColumnOrder(updatedColumn.order);
    } catch (e) {
      // TODO Error Modal
    }
  };

  const getTasks = async () => {
    try {
      const tasks: ITask[] = await api.task.getAll({ boardId: boardId as string, columnId: id });
      setTasks(tasks);
      setIsTasksLoad(true);
    } catch (e) {
      // TODO Error Modal
    }
  };

  const handleCreateTask = async (data: ITaskCreate) => {
    try {
      const newTask: ITask = await api.task.get({
        boardId: boardId as string,
        columnId: id,
        taskId: data.id,
      });

      const updatedTasks = tasks.slice();
      updatedTasks.push(newTask);
      setTasks(updatedTasks);
    } catch (e) {
      // TODO Error Modal
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await api.task.delete({
        boardId: boardId as string,
        columnId: id,
        taskId: taskId,
      });
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (e) {
      // TODO Error Modal
    }
  };

  const deleteCurrentTask = (taskId: string) => {
    deleteTask(taskId).then();
    dispatch(deleteTaskTasks(taskId));
  };

  return (
    <>
      <Card className="column">
        <IconButton
          onClick={() => setIsConfirmModalActive(true)}
          sx={{ position: 'absolute', top: '0', right: '0', padding: '2px' }}
        >
          <CancelIcon fontSize="small" />
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
            <Grid display="flex" alignItems="center">
              <Box>
                <ButtonComponent
                  className={`column__button ${isFocused ? 'isFocused' : ''}`}
                  onClick={submitTitle}
                >
                  <CheckIcon sx={{ fontSize: '14px' }} />
                </ButtonComponent>
                <ButtonComponent
                  className={`column__button ${isFocused ? 'isFocused' : ''}`}
                  onClick={cancelTitle}
                >
                  <CancelIcon fontSize="small" />
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
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, height: '84%' }}>
          {!isTasksLoad ? (
            <Spinner />
          ) : (
            <Grid
              container
              height="100%"
              overflow="auto"
              alignItems="center"
              flexDirection="column"
              flexWrap="nowrap"
            >
              {tasks
                .sort((a, b) => a.order - b.order)
                .map(({ title, id, description }) => (
                  <TaskCard
                    key={id}
                    title={title}
                    deleteTask={() => deleteCurrentTask(id)}
                    id={id}
                    description={description}
                  />
                ))}
            </Grid>
          )}
        </CardContent>
        <CardFooter>
          <ButtonComponent type="button" onClick={() => setIsCreateModalActive(true)}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <AddIcon fontSize="small" />
              <Typography fontSize="0.7rem" variant="body1">
                Create task
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
        <div>Do you agree to delete this column?</div>
      </ConfirmModal>
    </>
  );
};
