import React, { useCallback, useState } from 'react';
import { Button, MenuItem, SvgIcon, Menu } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

import { ReactComponent as EnIcon } from '../../assets/icons/en.svg';
import { ReactComponent as RuIcon } from '../../assets/icons/ru.svg';

interface ILanguageToggleProps {
  size?: 'small' | 'medium' | 'large';
  color?: {
    background: string;
    hover: string;
  } | null;
  transition?: string;
}

export function LanguageToggle(props: ILanguageToggleProps) {
  const [anchorLanguageToggle, setAnchorLanguageToggle] = useState<null | HTMLElement>(null);
  const isLanguageToggleClicked = Boolean(anchorLanguageToggle);

  const handleLanguageToggleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorLanguageToggle(event.currentTarget);
  };
  const handleLanguageToggleClose = () => {
    setAnchorLanguageToggle(null);
  };

  const { t, i18n } = useTranslation();

  const handleLanguageToggle = useCallback(
    (event: React.MouseEvent<HTMLLIElement>) => {
      const locale = event.currentTarget.dataset.value;
      if (locale) {
        i18n.changeLanguage(locale).then();
        localStorage.setItem('locale', locale);
      }
      handleLanguageToggleClose();
    },
    [i18n]
  );

  return (
    <>
      <Button
        sx={{
          bgcolor: props.color?.background,
          '&:hover': {
            backgroundColor: props.color?.hover,
          },
          transition: props.transition,
        }}
        size={props.size}
        endIcon={isLanguageToggleClicked ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        variant="contained"
        disableElevation
        id="language-toggle-button"
        aria-controls={isLanguageToggleClicked ? 'language-toggle-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={isLanguageToggleClicked ? 'true' : undefined}
        onClick={handleLanguageToggleClick}
      >
        {i18n.language}
      </Button>
      <Menu
        id="language-toggle-menu"
        anchorEl={anchorLanguageToggle}
        open={isLanguageToggleClicked}
        onClose={handleLanguageToggleClose}
        MenuListProps={{
          'aria-labelledby': 'language-toggle-button',
        }}
      >
        <MenuItem data-value={'en'} onClick={handleLanguageToggle}>
          <SvgIcon sx={{ marginRight: '8px' }} inheritViewBox component={EnIcon} />
          {t('en')}
        </MenuItem>
        <MenuItem data-value={'ru'} onClick={handleLanguageToggle}>
          <SvgIcon sx={{ marginRight: '8px' }} inheritViewBox component={RuIcon} />
          {t('ru')}
        </MenuItem>
      </Menu>
    </>
  );
}
