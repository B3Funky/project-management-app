import React, { useState } from 'react';
import { Box, Card, CardContent, CardHeader, Grid, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ButtonComponent } from '../Button';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import './tasksColumn.css';
import { CardFooter } from '../TaskColumnFooter';
import { ColumnTitle } from '../CardTitle';

interface ITasksColumn {
  title: string;
}

export const TasksColumn = ({ title }: ITasksColumn) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Card className="column">
      <CardHeader
        style={{ padding: '10px' }}
        titleTypographyProps={{
          fontSize: '1rem',
          textAlign: 'left',
        }}
        action={
          <Grid display="flex" alignItems="center">
            <Box>
              <ButtonComponent className={`column__button ${isFocused ? 'isFocused' : ''}`}>
                <CheckIcon sx={{ fontSize: '14px' }} />
              </ButtonComponent>
              <ButtonComponent className={`column__button ${isFocused ? 'isFocused' : ''}`}>
                <CancelIcon fontSize="small" />
              </ButtonComponent>
            </Box>
            <ColumnTitle
              title={title}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </Grid>
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
