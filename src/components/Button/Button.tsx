import React, { ReactElement } from 'react';
import { SxProps } from '@mui/system';
import Button from '@mui/material/Button';

interface IButton {
  size?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  children: ReactElement | string;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  sx?: SxProps;
}

export const ButtonComponent = ({
  className,
  variant,
  children,
  size,
  color,
  isDisabled,
  onClick,
  type,
  sx,
}: IButton) => {
  return (
    <Button
      className={className}
      color={color}
      variant={variant}
      size={size}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
      sx={sx}
    >
      {children}
    </Button>
  );
};
