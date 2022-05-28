import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';

import { TextAreaComponent } from '../TextAreaComponent';
import { ConfirmModal } from '../ConfirmModal';
import { TaskModal } from '../TaskModal';
import api, { ITaskDataUpdate } from '../../utils/ApiBackend';
import { ITask } from '../../models/api';

import './task-card.css';

export interface ITaskCard extends ITask {
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

export const TaskCard = (props: ITaskCard) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [isTaskModalActive, setIsTaskModalActive] = useState(false);
  const [taskDescription, setTaskDescription] = useState<string | undefined>('');
  const [currentTaskDescriptionText, setCurrentTaskDescriptionText] = useState<string | undefined>(
    ''
  );
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const taskTitleRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCurrentTaskDescriptionText(props.description);
    setTaskTitle(props.title);
  }, []);

  const setCurrentDescription = (description: string) => {
    setCurrentTaskDescriptionText(description);
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

  const updateTaskTitle = async (data: ITaskDataUpdate) => {
    try {
      await api.task.update(
        { boardId: props.boardId, columnId: props.columnId, taskId: props.id },
        data
      );
    } catch (e) {
      // TODO Error Modal
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
          // border: `${props.done ? '3px solid #34eb6e' : ''}`,
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
            onBlur={() => {
              updateTaskTitle({
                title: taskTitle,
                description: props.description,
                order: props.order,
                userId: props.userId,
                boardId: props.boardId,
                columnId: props.columnId,
              }).then();
              setIsTitleFocused(false);
            }}
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
        confirmAction={() => (props.deleteTask ? props.deleteTask(props.id) : null)}
      >
        <div>Do you agree to delete this task?</div>
      </ConfirmModal>
      <TaskModal
        card={props}
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
