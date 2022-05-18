import React, { ChangeEvent } from 'react';
import './taskColumnTitle.css';

interface ITaskColumnTitle {
  title: string;
  value?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TaskColumnTitle = ({ title, value, onFocus, onBlur, onChange }: ITaskColumnTitle) => {
  const textAreaAdjust = (el: HTMLTextAreaElement) => {
    el.style.height = '1px';
    el.style.height = el.scrollHeight + 'px';
  };

  return (
    <textarea
      defaultValue={title}
      className="column__title"
      onChange={(e) => {
        textAreaAdjust(e.target);
      }}
      onInput={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
    />
  );
};
