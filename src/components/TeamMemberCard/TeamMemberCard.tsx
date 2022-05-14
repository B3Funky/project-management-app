import React from 'react';

import { Paper } from '@mui/material';

import './team-member-card.css';
import { useTranslation } from 'react-i18next';

interface ITeamMember {
  name: string;
}

export function TeamMemberCard({ name }: ITeamMember) {
  const { t } = useTranslation();
  return (
    <a className={'team-member-link-wrapper'} href={t(`${name}.githubUrl`)} target="blank">
      <Paper className={'team-member'} elevation={3}>
        <img
          className={'team-member-github-avatar'}
          src={t(`${name}.githubAvatar`)}
          alt={`${t(`${name}.githubName`)} GitHub avatar image`}
        ></img>
        <div className={'team-member-info'}>
          <div>{t(`${name}.name`)}</div>
          <div>{t(`${name}.githubName`)}</div>
          <div>{t(`${name}.role`)}</div>
        </div>
      </Paper>
    </a>
  );
}
