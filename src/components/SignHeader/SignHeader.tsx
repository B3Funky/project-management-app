import React from 'react';

import { LanguageToggle } from '../LanguageToggle';

import './login.css';

export function SignHeader() {
  return (
    <header className={'sign-header'}>
      <LanguageToggle />
    </header>
  );
}
