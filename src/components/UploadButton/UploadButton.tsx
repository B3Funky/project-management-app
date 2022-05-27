import { Button } from '@mui/material';
import React, { ChangeEvent } from 'react';

interface IUploadButton {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const UploadButton = ({ onChange }: IUploadButton) => {
  return (
    <Button variant="contained" component="label">
      Upload File
      <input type="file" hidden onChange={onChange} />
    </Button>
  );
};
