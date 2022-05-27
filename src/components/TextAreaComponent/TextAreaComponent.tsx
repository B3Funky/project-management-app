import React, { ChangeEvent } from 'react';
import './text-area-component.css';

interface ITextAreaComponent {
  value?: string;
  className?: string;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  customRef?: React.RefObject<HTMLTextAreaElement>;
}

export const TextAreaComponent = ({
  value,
  className,
  placeholder,
  onFocus,
  onBlur,
  onChange,
  customRef,
}: ITextAreaComponent) => {
  const textAreaAdjust = (el: HTMLTextAreaElement) => {
    el.style.height = '1px';
    el.style.height = el.scrollHeight + 'px';
  };

  return (
    <textarea
      className={className}
      onChange={(e) => {
        textAreaAdjust(e.target);
      }}
      onInput={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
      ref={customRef}
    />
  );
};
