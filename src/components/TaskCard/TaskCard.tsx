import React, { useState, useEffect } from 'react';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { ConfirmModal } from '../ConfirmModal';

export interface ITaskCard {
  title: string;
  id: number;
  description?: string;
  order?: number;
  done?: boolean;
  userId?: string;
  files?: ITaskCardFiles[];
  deleteTask?: (id: number) => void;
}

interface ITaskCardFiles {
  fileName?: string;
  fileSize?: number;
}

const isHoveredStyle = {
  position: 'absolute',
  top: '0',
  p: '0',
};

export const TaskCard = ({
  title,
  id,
  description,
  done,
  files,
  order,
  userId,
  deleteTask,
}: ITaskCard) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [isTaskModalActive, setIsTaskModalActive] = useState(false);
  const [taskDescription, setTaskDescription] = useState<string | undefined>('');

  useEffect(() => {
    setTaskDescription(description);
  }, []);

  const setDescription = (descr: string) => {
    console.log(descr);
  };

  return (
    <Box
      width="100%"
      position="relative"
      display="flex"
      alignItems="center"
      flexDirection="column"
      onMouseMove={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ cursor: 'pointer' }}
    >
      <Card
        sx={{ width: '90%', overflow: 'visible', m: '10px 0px' }}
        onClick={() => setIsTaskModalActive(true)}
      >
        <CardContent
          sx={{
            p: 0,
            '&:last-child': { pb: 0 },
            height: '100%',
            wordBreak: 'break-word',
          }}
        >
          <Typography p={1} textAlign="left">
            {title}
          </Typography>
        </CardContent>
      </Card>
      <IconButton
        sx={{
          right: '0',
          visibility: isHovered ? 'visible' : 'hidden',
          ...isHoveredStyle,
        }}
      >
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton
        sx={{
          left: '0',
          visibility: isHovered ? 'visible' : 'hidden',
          ...isHoveredStyle,
        }}
        onClick={() => setIsDeleteModalActive(true)}
      >
        <CancelIcon fontSize="small" />
      </IconButton>
      <ConfirmModal
        active={isDeleteModalActive}
        setActive={setIsDeleteModalActive}
        confirmAction={() => (deleteTask ? deleteTask(id) : null)}
      >
        <div>Do you agree to delete this task?</div>
      </ConfirmModal>
    </Box>
  );
};
