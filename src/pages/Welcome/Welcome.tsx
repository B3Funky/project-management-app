import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

import { Background } from '../../components/Background';
import { paths } from '../../routes/paths';

import './welcome.css';

export function Welcome() {
  return (
    <>
      <header className={'welcome-header'}>
        <Button component={NavLink} to={paths.login} variant="contained" size={'large'}>
          Login
        </Button>
        <Button component={NavLink} to={paths.login} variant="contained" size={'large'}>
          Sign up
        </Button>
      </header>
      <main>
        <h1 className={'welcome-h1'}>Welcome Page</h1>
        <Background></Background>
      </main>
    </>
  );
}
