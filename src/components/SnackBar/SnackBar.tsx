import React, { ReactElement, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import { IErrorResponse } from '../../utils/ApiBackend';
import { useTranslation } from 'react-i18next';

import './snack-bar.css';

const HIDE_DURATION = 5000;

export interface IErrorMessage extends IErrorResponse {
  text: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

interface ISnackBar {
  isOpen?: boolean;
  message?: IErrorMessage;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  hideDuration?: number;
  children?: ReactElement | string;
}

export const SnackBarComponent = ({
  isOpen,
  message,
  hideDuration = HIDE_DURATION,
  setIsOpen,
  children,
}: ISnackBar) => {
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, hideDuration);
  }, [isOpen]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isOpen}
      autoHideDuration={HIDE_DURATION}
    >
      <Alert severity={message?.severity} sx={{ width: '100%' }}>
        {!message ? (
          children
        ) : (
          <div className="snackbar-text">
            <p>{message.text}</p>
            <p>{`${t('status_code')}: ${message.status}`}</p>
            <p>{message.message}</p>
          </div>
        )}
      </Alert>
    </Snackbar>
  );
};
