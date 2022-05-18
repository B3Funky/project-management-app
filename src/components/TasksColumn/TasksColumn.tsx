import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ButtonComponent } from '../Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import './tasksColumn.css';
import { CardFooter } from '../TaskColumnFooter';
import { TaskColumnTitle } from '../TaskColumnTitle';

interface ITasksColumn {
  title: string;
  onClick?: () => void;
}

export const TasksColumn = ({ title, onClick }: ITasksColumn) => {
  const [isFocused, setIsFocused] = useState(false);
  const [currentTitle, setCurrentTitle] = useState<string | null>('');
  const [changedText, setChangedText] = useState<string | null>('');

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

  return (
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
            <TaskColumnTitle
              title={currentTitle || ''}
              value={changedText || ''}
              onFocus={() => setIsFocused(true)}
              onChange={(e) => setChangedText(e.currentTarget.value)}
            />
          </>
        }
      />
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, height: '84%' }}>
        <Grid height="100%" overflow="auto"></Grid>
      </CardContent>
      <CardFooter>
        <ButtonComponent type="button">
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
  );
};
