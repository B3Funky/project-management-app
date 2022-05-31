import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, IconButton } from '@mui/material';
import { Box } from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';

import { SnackBarComponent, IErrorMessage } from '../SnackBar';
import { TextAreaComponent } from '../TextAreaComponent';
import { ConfirmModal } from '../ConfirmModal';
import { TaskModal } from '../TaskModal';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import api, { ITaskDataUpdate, ErrorResponse } from '../../utils/ApiBackend';
import { ITask } from '../../models/api';

import './task-card.css';

export interface ITaskCard extends ITask {
  deleteTask?: (id: string) => void;
  dragProvider?: DraggableProvided;
  dragSnapShot?: DraggableStateSnapshot;
}

export interface ITaskCardFiles {
  fileName?: string;
  fileSize?: number;
}

const isHoveredStyle = {
  position: 'absolute',
  top: '2px',
  p: '0',
};

export const TaskCard = (props: ITaskCard) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteModalActive, setIsDeleteModalActive] = useState(false);
  const [isTaskModalActive, setIsTaskModalActive] = useState(false);
  const [taskDescription, setTaskDescription] = useState<string>('');
  const [currentTaskDescriptionText, setCurrentTaskDescriptionText] = useState<string>('');
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const taskTitleRef = useRef<HTMLTextAreaElement>(null);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<IErrorMessage | undefined>();

  const { t } = useTranslation();

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
      <SnackBarComponent
        isOpen={Boolean(isRequestError)}
        setIsOpen={setIsRequestError}
        message={errorMessage}
      ></SnackBarComponent>
      <Card
        sx={{
          width: '90%',
          overflow: 'visible',
          m: '10px 0px',
          ...props.dragProvider?.draggableProps.style,
        }}
        onClick={() => {
          !isTitleFocused ? (setIsTaskModalActive(true), handleTitleBlur()) : null;
        }}
        ref={props.dragProvider?.innerRef}
        {...props.dragProvider!.draggableProps}
        {...props.dragProvider!.dragHandleProps}
      >
        <CardContent
          sx={{
            p: 0,
            '&:last-child': { pb: 0 },
            height: '100%',
            wordBreak: 'break-word',
          }}
          className="task-card__content"
        >
          <TextAreaComponent
            className="task-card__title"
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
          right: '6px',
          visibility: isHovered ? 'visible' : 'hidden',
          ...isHoveredStyle,
        }}
        onClick={() => handleTitleFocus()}
      >
        <EditIcon fontSize="small" sx={{ color: '#1e6e2e' }} />
      </IconButton>
      <IconButton
        sx={{
          left: '6px',
          visibility: isHovered ? 'visible' : 'hidden',
          ...isHoveredStyle,
        }}
        onClick={() => setIsDeleteModalActive(true)}
      >
        <CancelIcon fontSize="small" sx={{ color: '#cd5d5d' }} />
      </IconButton>
      <ConfirmModal
        active={isDeleteModalActive}
        setActive={setIsDeleteModalActive}
        confirmAction={() => (props.deleteTask ? props.deleteTask(props.id) : null)}
      >
        <div>{t('agree_delete_task')}</div>
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
