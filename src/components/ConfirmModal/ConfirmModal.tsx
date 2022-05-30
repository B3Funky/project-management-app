import { Box, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonComponent } from '../Button';
import { ModalComponent } from '../Modal';

interface IConfirmModal {
  active: boolean;
  setActive: (arg: boolean) => void;
  children: ReactElement | string;
  confirmAction: () => void;
  title?: string;
  confirmText?: string;
  cancelText?: string;
}

const style = {
  margin: '5px 0px',
  fontSize: '2.5rem',
};

export const ConfirmModal = ({
  active,
  setActive,
  cancelText,
  children,
  confirmText,
  title,
  confirmAction,
}: IConfirmModal) => {
  const { t } = useTranslation();

  return (
    <ModalComponent active={active} setActive={setActive}>
      <Box>
        <Typography sx={style} variant="h2">
          {title}
        </Typography>
        <Box pt={2} pb={2} textAlign="center">
          {children}
        </Box>
        <Box display="flex" justifyContent="space-between">
          <ButtonComponent variant="contained" color="error" onClick={confirmAction}>
            {confirmText || t('yes')}
          </ButtonComponent>
          <ButtonComponent variant="contained" color="primary" onClick={() => setActive(false)}>
            {cancelText || t('no')}
          </ButtonComponent>
        </Box>
      </Box>
    </ModalComponent>
  );
};
