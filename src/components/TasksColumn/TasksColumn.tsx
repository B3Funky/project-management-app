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
import { ModalComponent } from '../Modal';
import { ITaskCard } from '../TaskCard/TaskCard';
import { InputComponent } from '../Input';

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
  const [taskTitle, setTaskTitle] = useState('');
  const [tasks, setTasks] = useState<ITaskCard[]>([
    { title: 'Title 1', id: 0 },
    { title: 'Title 2', id: 1 },
    { title: 'Title 3', id: 2 },
    { title: 'Title 4', id: 3 },
  ]);

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

  const openModal = () => {
    setIsCreateModalActive(true);
    setTaskTitle('');
  };

  const addtask = () => {
    setTasks([...tasks, { title: taskTitle, id: Date.now() }]);
    setIsCreateModalActive(false);
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
      <Card className="column">
        <IconButton
          onClick={onClick}
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
              <TaskCard key={Date.now() + title} title={title} deleteTask={deleteTask} id={id} />
            ))}
          </Grid>
        </CardContent>
        <CardFooter>
          <ButtonComponent type="button" onClick={openModal}>
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
      <ModalComponent active={isCreateModalActive} setActive={setIsCreateModalActive}>
        <Box>
          <Typography variant="h4">Create Task</Typography>
          <Grid container alignItems="stretch" justifyContent="space-between">
            <InputComponent
              placeholder="Select Task Title"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <ButtonComponent variant="contained" onClick={addtask}>
              <Typography variant="body2">Submit</Typography>
            </ButtonComponent>
          </Grid>
        </Box>
      </ModalComponent>
    </>
  );
};
