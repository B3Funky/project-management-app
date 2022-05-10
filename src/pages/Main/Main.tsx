import React from 'react';
import { NavLink } from 'react-router-dom';

import { paths } from '../../routes/paths';

import { Header } from '../../components/Header';

import './main.css';
import { Grid } from '@mui/material';

export function Main() {
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
        <h1>Main Page</h1>
        <NavLink to={paths.board}>to Board page</NavLink>
      </Grid>
    </>
  );
}
