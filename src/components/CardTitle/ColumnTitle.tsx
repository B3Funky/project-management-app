import React from 'react';
import './columnTitle.css';

interface IColumnTitle {
  title: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const ColumnTitle = ({ title, onFocus, onBlur }: IColumnTitle) => {
  const textAreaAdjust = (el: HTMLTextAreaElement) => (el.style.height = el.scrollHeight + 'px');

  return (
    <textarea
      defaultValue={title}
      className="column__title"
      onChange={(e) => textAreaAdjust(e.target)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};
