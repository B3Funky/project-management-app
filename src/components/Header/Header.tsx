import { MenuItem, Select, SvgIcon } from '@mui/material';

import { ReactComponent as EnIcon } from './eng.svg';
import { ReactComponent as RuIcon } from './rus.svg';

import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import './header.css';

export function Header() {
  const { t, i18n } = useTranslation();

  const changeLanguage = useCallback(
    (event: { target: { value: string | undefined } }) => {
      i18n.changeLanguage(event.target.value);
    },
    [i18n]
  );

  return (
    <header className={'header'}>
      <Select
        sx={{
          width: 100,
          '& .MuiSelect-select': {
            display: 'flex',

            '& .MuiSvgIcon-root': {
              marginRight: '8px',
            },
          },
        }}
        value={i18n.language}
        label="Язык"
        onChange={changeLanguage}
      >
        <MenuItem
          value={'ru'}
          sx={{
            width: 100,
            '& .MuiSvgIcon-root': {
              marginRight: '8px',
            },
          }}
        >
          <>
            <SvgIcon inheritViewBox component={RuIcon} />
            {t('ru')}
          </>
        </MenuItem>
        <MenuItem
          sx={{
            width: 100,
            '& .MuiSvgIcon-root': {
              marginRight: '8px',
            },
          }}
          value={'en'}
        >
          <>
            <SvgIcon inheritViewBox component={EnIcon} />
            {t('en')}
          </>
        </MenuItem>
      </Select>
    </header>
  );
}
