import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import { Background } from '../../components/Background';
import { TeamMemberCard } from '../../components/TeamMemberCard';
import { paths } from '../../routes/paths';
import text from './text.json';

import './welcome.css';

export function Welcome() {
  const [showTeam, setShowTeam] = useState(false);

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

      <main className={classNames('welcome-main', { 'welcome-main-show-team': showTeam })}>
        <h1 className={'welcome-h1'}>{text.h1}</h1>
        <h2>{text.h2}</h2>

        {!showTeam && (
          <div className={'welcome-about'}>
            <p>{text.about}</p>
          </div>
        )}

        <a
          className={'welcome-show-team'}
          onClick={() => {
            setShowTeam(!showTeam);
          }}
        >
          <p>{showTeam ? text.showAbout : text.showTeam}</p>
          <DoubleArrowIcon
            className={classNames('welcome-show-team-arrow', {
              'welcome-show-team-arrow-right': showTeam,
            })}
            fontSize={'large'}
          ></DoubleArrowIcon>
        </a>

        {showTeam && (
          <div className={'welcome-team'}>
            <p>Dev.team</p>
            <div className={'welcome-dev-team'}>
              {text.team.map((member, i) => {
                return <TeamMemberCard key={i} {...member}></TeamMemberCard>;
              })}
            </div>
            <p>Mentor</p>
            <TeamMemberCard {...text.mentor}></TeamMemberCard>
          </div>
        )}

        <Background></Background>
      </main>
    </>
  );
}
