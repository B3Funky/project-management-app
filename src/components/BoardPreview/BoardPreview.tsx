import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getRandomColor } from '../../utils/getRandomColor';
import './boardPreview.css';

export interface IBoardPreview {
  title?: string;
  id: number;
  description?: string;
  handleDelete?: () => void;
  onClick?: () => void;
}

export const BoardPreview = ({ title, description, handleDelete, onClick }: IBoardPreview) => {
  const [isHovered, setIsHovered] = useState(false);
  const [background, setBackground] = useState('');
  const [isCancelHovered, setIsCancelHovered] = useState(false);

  useEffect(() => {
    setBackground(getRandomColor());
  }, []);

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
        onClick={handleDelete}
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
  );
};
