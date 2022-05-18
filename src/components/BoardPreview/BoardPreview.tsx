import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getRandomColor } from '../../utils/getRandomColor';
import './boardPreview.css';

interface IBoardPreview {
  title: string;
  description?: string;
  handleDelete: () => void;
}

export const BoardPreview = ({ title, description, handleDelete }: IBoardPreview) => {
  const [isHovered, setIsHovered] = useState(false);
  const [background, setBackground] = useState('');

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
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
