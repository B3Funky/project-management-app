import React, { ReactElement } from 'react';
import Button from '@mui/material/Button';

interface IButton {
  currentSize?: 'small' | 'medium' | 'large';
  variant?: 'text' | 'outlined' | 'contained';
  children: ReactElement | string;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

export const ButtonComponent = ({
  className,
  variant,
  children,
  currentSize,
  color,
  isDisabled,
  onClick,
  type,
}: IButton) => {
  return (
    <Button
      className={className}
      color={color}
      variant={variant}
      size={currentSize}
      disabled={isDisabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );
};
