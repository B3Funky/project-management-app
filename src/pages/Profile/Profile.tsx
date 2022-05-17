import React from 'react';
import { NavLink } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Header } from '../../components/Header';
import { paths } from '../../routes/paths';

export function Profile() {
  const { t } = useTranslation();

  return (
    <>
      <Header isProfilePage={true} />
      <Grid
        height="100%"
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>{t('welcome_to_react')}</h1>
        <h2>Profile page</h2>
        <NavLink to={paths.main}>back to Main page</NavLink>
      </Grid>
    </>
  );
}
