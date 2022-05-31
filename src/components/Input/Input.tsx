import React from 'react';
import TextField from '@mui/material/TextField';

interface ITextField {
  size?: 'small' | 'medium';
  variant?: 'outlined' | 'standard' | 'filled';
  defaultValue?: string;
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  placeholder?: string;
  label?: string;
  isDisabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  errorText?: string;
  value?: string;
}

export const InputComponent = ({
  className,
  size,
  variant,
  defaultValue,
  color,
  placeholder,
  label,
  isDisabled,
  type,
  errorText,
  onChange,
  value,
}: ITextField) => {
  return (
    <TextField
      className={className}
      size={size}
      variant={variant}
      defaultValue={defaultValue}
      color={color}
      placeholder={placeholder}
      label={label}
      disabled={isDisabled}
      type={type}
      onChange={onChange}
      error={!!errorText}
      helperText={errorText}
      value={value}
    />
  );
};
