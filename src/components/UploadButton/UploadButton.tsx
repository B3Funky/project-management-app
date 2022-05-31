import React, { ChangeEvent } from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IUploadButton {
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const UploadButton = ({ onChange }: IUploadButton) => {
  const { t } = useTranslation();

  return (
    <Button variant="contained" component="label">
      {t('upload_file')}
      <input multiple type="file" hidden onChange={onChange} />
    </Button>
  );
};
