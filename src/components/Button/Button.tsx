import React, { ReactElement } from 'react';
import Button from '@mui/material/Button';

interface IButton {
  size?: 'small' | 'medium' | 'large
  variant?: 'text' | 'outlined' | 'contained';
  children: ReactElement | string;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  isDisabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const ButtonComponent = ({
  className,
  variant,
  children,
  size,
  color,
  isDisabled,
  onClick,
}: IButton) => {
  return (
    <Button
      className={className}
      color={color}
      variant={variant}
      size={size}
      disabled={isDisabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
