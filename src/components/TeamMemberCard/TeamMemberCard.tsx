import React from 'react';

import { Paper } from '@mui/material';

import './team-member-card.css';

interface ITeamMember {
  name: string;
  role: string;
  githubName: string;
  githubUrl: string;
  githubAvatar: string;
}

export function TeamMemberCard(props: ITeamMember) {
  return (
    <a className={'team-member-link-wrapper'} href={props.githubUrl} target="blank">
      <Paper className={'team-member'} elevation={3}>
        <img
          className={'git-avatar'}
          src={props.githubAvatar}
          alt={`${props.githubName} GitHub avatar image`}
        ></img>
        <div className={'team-member-info'}>
          <div>{props.name}</div>
          <div>{props.githubName}</div>
          <div>{props.role}</div>
        </div>
      </Paper>
    </a>
  );
}
