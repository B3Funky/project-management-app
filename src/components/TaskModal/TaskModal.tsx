import React, { ChangeEvent, useEffect, useState } from 'react';
import { Card, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { SnackBarComponent, IErrorMessage } from '../SnackBar';
import { ModalComponent } from '../Modal';
import { TextAreaComponent } from '../TextAreaComponent';
import { ButtonComponent } from '../Button';
import { UploadButton } from '../UploadButton';
import api, { ITaskDataUpdate, ErrorResponse } from '../../utils/ApiBackend';
import { ITaskCard, ITaskCardFiles } from '../TaskCard/TaskCard';

import './task-modal.css';

interface ITaskModal {
  card: ITaskCard;
  taskDescription: string;
  taskTitle: string;
  isActive: boolean;
  setIsActive: (arg: boolean) => void;
  setDescription: (description: string) => void;
  saveDescription: () => void;
  cancelDescription: () => void;
  setTitle: (description: string) => void;
}

export const TaskModal = ({
  card,
  taskDescription,
  isActive,
  setIsActive,
  setDescription,
  saveDescription,
  cancelDescription,
  setTitle,
  taskTitle,
}: ITaskModal) => {
  const [isFocused, setIsFocused] = useState(false);
  const [taskFiles, setTaskFiles] = useState<ITaskCardFiles[]>([]);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<IErrorMessage | undefined>();

  const { t } = useTranslation();

  useEffect(() => {
    if (card.files) {
      setTaskFiles(card.files);
    }
  }, []);

  const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files?.length; i++) {
        // console.log(files[i].name);
        setTaskFiles((taskFiles) => [
          ...taskFiles,
          { fileName: files[i].name, fileSize: files[i].size },
        ]);
        // console.log(taskFiles);
      }
    }
  };

  const updateTask = async (data: ITaskDataUpdate) => {
    try {
      await api.task.update(
        { boardId: card.boardId, columnId: card.columnId, taskId: card.id },
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
    <>
      <SnackBarComponent
        isOpen={Boolean(isRequestError)}
        setIsOpen={setIsRequestError}
        message={errorMessage}
      ></SnackBarComponent>
      <ModalComponent active={isActive} setActive={setIsActive} isArrow>
        <Card sx={{ height: '75vh', width: '50vw', p: '15px', bgcolor: '#fbf6e1' }}>
          <TextAreaComponent
            className="task-modal__textarea task-modal__title"
            value={taskTitle}
            onChange={(e) => setTitle(e.currentTarget.value)}
            onBlur={() => {
              updateTask({
                title: taskTitle,
                description: card.description,
                order: card.order,
                userId: card.userId,
                boardId: card.boardId,
                columnId: card.columnId,
              }).then();
            }}
          />
          <Grid>
            <Typography variant="h6">{t('description_task_modal')}</Typography>
            <TextAreaComponent
              className="task-modal__textarea task-modal__description"
              value={taskDescription}
              placeholder="Add a more detailed description"
              onChange={(e) => setDescription(e.target.value)}
              onFocus={() => setIsFocused(true)}
            />
            <Grid sx={{ visibility: isFocused ? 'visible' : 'hidden' }}>
              <ButtonComponent
                onClick={() => {
                  saveDescription();
                  updateTask({
                    title: card.title,
                    description: taskDescription,
                    order: card.order,
                    userId: card.userId,
                    boardId: card.boardId,
                    columnId: card.columnId,
                  }).then();
                  setIsFocused(false);
                }}
              >
                <Typography>{t('save')}</Typography>
              </ButtonComponent>
              <ButtonComponent
                onClick={() => {
                  cancelDescription();
                  setIsFocused(false);
                }}
              >
                <Typography>{t('cancel')}</Typography>
              </ButtonComponent>
            </Grid>
          </Grid>
          <Grid container flexDirection="column" alignItems="flex-start" rowGap={2}>
            {t('files')}
            {taskFiles.map(({ fileName, fileSize }, i) => (
              <div key={`${fileName} - ${fileSize} - ${i}`}>
                <div>Name: {fileName}</div>
                <div>Size: {fileSize}</div>
              </div>
            ))}
            <UploadButton onChange={handleAddFile} />
          </Grid>
        </Card>
      </ModalComponent>
    </>
  );
};
