import React from 'react';
import { NavLink } from 'react-router-dom';

import { paths } from '../../routes/paths';

import { Header } from '../../components/Header';

import './main.css';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

export function Main() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Grid
        height="100%"
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>{t('welcome_to_react')}</h1>
        <NavLink to={paths.board}>{t('to_board_page')}</NavLink>
      </Grid>
    </>
  );
}
