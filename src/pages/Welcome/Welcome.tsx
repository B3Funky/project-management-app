import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import { Background } from '../../components/Background';
import { paths } from '../../routes/paths';

import './welcome.css';

const text = {
  buttons: {
    login: 'Login',
    signUp: 'Sign up',
  },
  h1: 'Project Management App',
  h2: 'by Team 50',
  about:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  showTeam: 'Show our team:',
};

export function Welcome() {
  return (
    <>
      <header className={'welcome-header'}>
        <Button component={NavLink} to={paths.login} variant="contained" size={'large'}>
          {text.buttons.login}
        </Button>
        <Button component={NavLink} to={paths.login} variant="contained" size={'large'}>
          {text.buttons.signUp}
        </Button>
      </header>
      <main>
        <h1 className={'welcome-h1'}>{text.h1}</h1>
        <h2>{text.h2}</h2>
        <div className={'about'}>
          <p>{text.about}</p>
        </div>
        <a className={'show-team'} href={'#'}>
          <p>{text.showTeam}</p>
          <DoubleArrowIcon className={'show-team-arrow'} fontSize={'large'}></DoubleArrowIcon>
        </a>
        <Background></Background>
      </main>
    </>
  );
}
