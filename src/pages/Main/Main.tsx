import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header';
import { paths } from '../../routes/paths';

import './main.css';

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
