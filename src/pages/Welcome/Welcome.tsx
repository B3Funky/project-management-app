import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Button, Paper } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

import { Background } from '../../components/Background';
import { paths } from '../../routes/paths';

import './welcome.css';

interface ITeamMember {
  name: string;
  role: string;
  githubName: string;
  githubUrl: string;
  githubAvatar: string;
}

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
  showAbout: 'About this project',
  team: [
    {
      name: 'Sergei Tiutin',
      role: 'TeamLead, Coding',
      githubName: 'B3Funky',
      githubUrl: 'https://github.com/B3Funky',
      githubAvatar: 'https://avatars.githubusercontent.com/u/50629262?v=4',
    },
    {
      name: 'Anastasia Gubina',
      role: 'Coding',
      githubName: 'Anasstassia',
      githubUrl: 'https://github.com/Anasstassia',
      githubAvatar: 'https://avatars.githubusercontent.com/u/74318575?v=4',
    },
    {
      name: 'Name Surname',
      role: '???',
      githubName: 'GitHub Name',
      githubUrl: 'https://github.com/',
      githubAvatar: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    },
  ],
  mentor: {
    name: 'Mikhail Chernyshenko',
    role: 'Mentor',
    githubName: 'chermic',
    githubUrl: 'https://github.com/chermic',
    githubAvatar: 'https://avatars.githubusercontent.com/u/29860818?v=4',
  },
};

export function Welcome() {
  const [showTeam, setShowTeam] = useState(false);

  function teamMemberCard(member: ITeamMember, key: number) {
    return (
      <a key={key} className={'team-member-link-wrapper'} href={member.githubUrl} target="blank">
        <Paper className={'team-member'} elevation={3}>
          <img
            className={'git-avatar'}
            src={member.githubAvatar}
            alt={`${member.githubName} GitHub avatar image`}
          ></img>
          <div className={'team-member-info'}>
            <div>{member.name}</div>
            <div>{member.githubName}</div>
            <div>{member.role}</div>
          </div>
        </Paper>
      </a>
    );
  }

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

      <main className={classNames({ 'main-show-team': showTeam })}>
        <h1 className={'welcome-h1'}>{text.h1}</h1>
        <h2>{text.h2}</h2>

        {!showTeam && (
          <div className={'about'}>
            <p>{text.about}</p>
          </div>
        )}

        <a
          className={'show-team'}
          onClick={() => {
            setShowTeam(!showTeam);
          }}
        >
          <p>{showTeam ? text.showAbout : text.showTeam}</p>
          <DoubleArrowIcon
            className={classNames('show-team-arrow', { 'show-team-arrow-right': showTeam })}
            fontSize={'large'}
          ></DoubleArrowIcon>
        </a>

        {showTeam && (
          <div className={'team'}>
            <p>Dev.team</p>
            <div className={'dev-team'}>
              {text.team.map((member, i) => {
                return teamMemberCard(member, i);
              })}
            </div>
            <p>Mentor</p>
            {teamMemberCard(text.mentor, 3)}
          </div>
        )}

        <Background></Background>
      </main>
    </>
  );
}
