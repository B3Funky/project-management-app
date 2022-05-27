import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { getRandomColor } from '../../utils/getRandomColor';
import api from '../../utils/ApiBackend';
import { IBoard } from '../../models/api';

import './boardPreview.css';

export interface IBoardPreview extends IBoard {
  onDelete?(id: string): void;
  onClick?: () => void;
}

export const BoardPreview = ({ id, title, description, onDelete, onClick }: IBoardPreview) => {
  const [isHovered, setIsHovered] = useState(false);
  const [background, setBackground] = useState('');

  useEffect(() => {
    setBackground(getRandomColor());
  }, []);

  const deleteBoard = async () => {
    try {
      await api.board.delete({ boardId: id });
      // TODO Maybe not good decision
      if (onDelete) {
        onDelete(id);
      }
    } catch (e) {
      // TODO Error Modal
    }
  };

  return (
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
    >
      <Box onClick={onClick}>
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
      </Box>
      <IconButton
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          color: '#fff',
          visibility: isHovered ? 'visible' : 'hidden',
        }}
        onClick={deleteBoard}
      >
        <CloseIcon />
      </IconButton>
    </Card>
  );
};
