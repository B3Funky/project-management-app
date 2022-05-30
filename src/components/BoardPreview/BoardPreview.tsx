import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';

import { SnackBarComponent, IErrorMessage } from '../SnackBar';
import { ConfirmModal } from '../ConfirmModal';
import api, { ErrorResponse } from '../../utils/ApiBackend';
import { getRandomColor } from '../../utils/getRandomColor';
import { IBoard } from '../../models/api';

import './boardPreview.css';

export interface IBoardPreview extends IBoard {
  onDelete?: () => void;
  onClick?: () => void;
}

export const BoardPreview = ({ id, title, description, onDelete, onClick }: IBoardPreview) => {
  const [isHovered, setIsHovered] = useState(false);
  const [background, setBackground] = useState('');
  const [isCancelHovered, setIsCancelHovered] = useState(false);
  const [isConfirmModalActive, setIsConfirmModalActive] = useState(false);
  const [isRequestError, setIsRequestError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<IErrorMessage | undefined>();

  const { t } = useTranslation();

  useEffect(() => {
    setBackground(getRandomColor());
  }, []);

  const deleteBoard = async () => {
    try {
      await api.board.delete({ boardId: id });
      if (onDelete) {
        onDelete();
      }
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
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 350,
          height: 100,
          cursor: 'pointer',
          position: 'relative',
          background: background,
          m: '10px',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => (!isCancelHovered && onClick ? onClick() : null)}
      >
        <CardHeader
          title={title}
          titleTypographyProps={{
            fontWeight: '700',
            color: '#fff',
          }}
          style={{ padding: 10 }}
        />
        <CardContent style={{ padding: '0px 10px' }}>
          <Typography color="#fff" variant="body1" className="boardPreview__description">
            {description}
          </Typography>
        </CardContent>
        <IconButton
          onClick={() => setIsConfirmModalActive(true)}
          onMouseEnter={() => setIsCancelHovered(true)}
          onMouseLeave={() => setIsCancelHovered(false)}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: '#fff',
            visibility: isHovered ? 'visible' : 'hidden',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Card>
      <ConfirmModal
        active={isConfirmModalActive}
        setActive={setIsConfirmModalActive}
        confirmAction={() => (onDelete ? deleteBoard() : null)}
      >
        <div>Do you agree to delete this board?</div>
      </ConfirmModal>
    </>
  );
};
