import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Spinner = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
  );
};
