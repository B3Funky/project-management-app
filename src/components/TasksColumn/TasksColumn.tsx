import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ButtonComponent } from '../Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import './tasks-column.css';
import { CardFooter } from '../TaskColumnFooter';
import { TextAreaComponent } from '../TextAreaComponent';
import { TaskCard } from '../TaskCard';
import { useAppDispatch, useAppSelector } from '../../redux-hooks';
import { TaskSlice } from '../../store/reducers/TaskReducer';
import { CreateModal } from '../CreateModal';
import { ConfirmModal } from '../ConfirmModal';

export interface ITasksColumn {
  title: string;
  onClick?: () => void;
  id: number;
  description: string;
}

export const TasksColumn = ({ title, onClick }: ITasksColumn) => {
  const [isFocused, setIsFocused] = useState(false);
  const [currentTitle, setCurrentTitle] = useState<string | null>('');
  const [changedText, setChangedText] = useState<string | null>('');
  const [isCreateModalActive, setIsCreateModalActive] = useState(false);
  const [isConfirmModalActive, setIsConfirmModalActive] = useState(false);

  const dispatch = useAppDispatch();
  const { deleteTask } = TaskSlice.actions;
  const { tasks } = useAppSelector((state) => state.TaskReducer);

  useEffect(() => {
    setCurrentTitle(title);
  }, []);

  const submitTitle = () => {
    setCurrentTitle(changedText);
    setIsFocused(false);
  };

  const cancelTitle = () => {
    setChangedText(currentTitle);
    setIsFocused(false);
  };

  const deleteCurentTask = (id: number) => {
    dispatch(deleteTask(id));
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
                title={currentTitle || ''}
                value={changedText || ''}
                className="column__title"
                onFocus={() => setIsFocused(true)}
                onChange={(e) => setChangedText(e.currentTarget.value)}
              />
            </>
          }
        />
        <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, height: '84%' }}>
          <Grid
            container
            height="100%"
            overflow="auto"
            alignItems="center"
            flexDirection="column"
            flexWrap="nowrap"
          >
            {tasks.map(({ title, id }) => (
              <TaskCard
                key={Date.now() + title}
                title={title}
                deleteTask={() => deleteCurentTask(id)}
                id={id}
              />
            ))}
          </Grid>
        </CardContent>
        <CardFooter>
          <ButtonComponent type="button" onClick={() => setIsCreateModalActive(true)}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <IconButton>
                <AddIcon fontSize="small" />
              </IconButton>
              <Typography fontSize="0.7rem" variant="body1">
                Create task
              </Typography>
            </Box>
          </ButtonComponent>
        </CardFooter>
      </Card>
      <CreateModal isActive={isCreateModalActive} setActive={setIsCreateModalActive} thing="Task" />
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
