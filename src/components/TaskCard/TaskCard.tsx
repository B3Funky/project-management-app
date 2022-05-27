import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { ConfirmModal } from '../ConfirmModal';
import { TaskModal } from '../TaskModal';
import { TextAreaComponent } from '../TextAreaComponent';
import './task-card.css';

export interface ITaskCard {
  title: string;
  id: string;
  description?: string;
  order?: number;
  done?: boolean;
  userId?: string;
  boardId?: string;
  columnId?: string;
  files?: ITaskCardFiles[];
  deleteTask?: (id: string) => void;
}

export interface ITaskCardFiles {
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
  const [currentTaskDescriptionText, setCurrentTaskDescriptionText] = useState<string | undefined>(
    ''
  );
  const [taskTitle, setTaskTitle] = useState<string | undefined>('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const taskTitleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentTaskDescriptionText(description);
    setTaskTitle(title);
  }, []);

  const setCurrentDescription = (descr: string) => {
    setCurrentTaskDescriptionText(descr);
  };

  const saveDescription = () => {
    setTaskDescription(currentTaskDescriptionText);
  };

  const cancelDescription = () => {
    setCurrentTaskDescriptionText(taskDescription);
  };

  const handleTitleFocus = () => {
    setIsTitleFocused(true);
    if (taskTitleRef.current) {
      taskTitleRef.current.focus();
    }
  };

  const handleTitleBlur = () => {
    setIsTitleFocused(false);
    if (taskTitleRef.current) {
      taskTitleRef.current.blur();
    }
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
      onBlur={() => setIsHovered(false)}
      sx={{
        cursor: 'pointer',
      }}
    >
      <Card
        sx={{
          width: '90%',
          overflow: 'visible',
          m: '10px 0px',
          border: `${done ? '3px solid #34eb6e' : ''}`,
          boxShadow: '0',
        }}
        onClick={() => {
          !isTitleFocused ? (setIsTaskModalActive(true), handleTitleBlur()) : null;
        }}
      >
        <CardContent
          sx={{
            p: 0,
            '&:last-child': { pb: 0 },
            height: '100%',
            wordBreak: 'break-word',
          }}
        >
          <TextAreaComponent
            className={`task-card__title ${isTitleFocused ? 'isFocused' : ''}`}
            value={taskTitle}
            customRef={taskTitleRef}
            onChange={(e) => setTaskTitle(e.currentTarget.value)}
            onBlur={() => setIsTitleFocused(false)}
          />
        </CardContent>
      </Card>
      <IconButton
        sx={{
          right: '0',
          visibility: isHovered ? 'visible' : 'hidden',
          ...isHoveredStyle,
        }}
        onClick={() => handleTitleFocus()}
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
      <TaskModal
        card={{ id, title, done, files, order, userId, description }}
        taskDescription={currentTaskDescriptionText}
        isActive={isTaskModalActive}
        setIsActive={setIsTaskModalActive}
        setDescription={setCurrentDescription}
        saveDescription={saveDescription}
        cancelDescription={cancelDescription}
        setTitle={setTaskTitle}
        taskTitle={taskTitle}
      />
    </Box>
  );
};
