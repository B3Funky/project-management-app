import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import { ModalComponent } from '../Modal';
import { ITaskCard, ITaskCardFiles } from '../TaskCard/TaskCard';
import { TextAreaComponent } from '../TextAreaComponent';
import './task-modal.css';
import { ButtonComponent } from '../Button';
import { UploadButton } from '../UploadButton';

interface ITaskModal {
  card: ITaskCard;
  taskDescription?: string;
  taskTitle?: string;
  isActive: boolean;
  setIsActive: (arg: boolean) => void;
  setDescription: (descr: string) => void;
  saveDescription: () => void;
  cancelDescription: () => void;
  setTitle: (descr: string) => void;
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
  const { id, title, done, files, order, userId, description } = card;
  const [isFocused, setIsFocused] = useState(false);
  const [taskFiles, setTaskFiles] = useState<ITaskCardFiles[]>([]);

  useEffect(() => {
    if (files) {
      setTaskFiles(files);
    }
  }, []);

  const handleAddFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files?.length; i++) {
        console.log(files[i].name);
        setTaskFiles((taskFiles) => [
          ...taskFiles,
          { fileName: files[i].name, fileSize: files[i].size },
        ]);
        console.log(taskFiles);
      }
    }
  };

  return (
    <ModalComponent active={isActive} setActive={setIsActive}>
      <Card sx={{ height: '75vh', width: '50vw', p: '15px' }}>
        <TextAreaComponent
          className="task-modal__textarea task-modal__title"
          value={taskTitle}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <Grid>
          <Typography variant="h6">Description:</Typography>
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
                setIsFocused(false);
              }}
            >
              <Typography>Save</Typography>
            </ButtonComponent>
            <ButtonComponent
              onClick={() => {
                cancelDescription();
                setIsFocused(false);
              }}
            >
              <Typography>Cancel</Typography>
            </ButtonComponent>
          </Grid>
        </Grid>
        <Grid container flexDirection="column" alignItems="flex-start">
          Files:
          {taskFiles.map(({ fileName, fileSize }, i) => (
            <div key={`${fileName} - ${fileSize} - ${i}`}>
              <div>Name: {fileName}</div>
              <div>Size: {fileSize}</div>
            </div>
          ))}
          <UploadButton onChange={handleAddFile} />
          <Typography>Add new file</Typography>
        </Grid>
      </Card>
    </ModalComponent>
  );
};
