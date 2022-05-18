import { Box } from '@mui/system';
import React, { ReactElement } from 'react';

interface ICardFooter {
  children: ReactElement | string;
}

export const CardFooter = ({ children }: ICardFooter) => {
  return <Box>{children}</Box>;
};
