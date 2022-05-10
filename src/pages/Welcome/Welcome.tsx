import { Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { paths } from '../../routes/paths';

import './welcome.css';

export function Welcome() {
  const { t } = useTranslation();
  return (
    <>
      <header className={'welcome-header'}>
        <NavLink to={paths.login}>Login</NavLink>
        <NavLink to={paths.login}>Sign up</NavLink>
      </header>
      <Grid
        height="100%"
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>{t('welcome_to_react')}</h1>
      </Grid>
    </>
  );
}
