import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { Button } from '@mui/material';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useTranslation } from 'react-i18next';

import { Background } from '../../components/Background';
import { TeamMemberCard } from '../../components/TeamMemberCard';
import { paths } from '../../routes/paths';
import { MEMBERS_LIST } from '../../constants';
import './welcome.css';

export function Welcome() {
  const [showTeam, setShowTeam] = useState(false);
  const scrollTrigger = useScrollTrigger({ disableHysteresis: true, threshold: 10 });

  const { t } = useTranslation();

  return (
    <>
      <header className={classNames('welcome-header', { 'welcome-header-mini': scrollTrigger })}>
        <Button
          component={NavLink}
          to={paths.login}
          variant="contained"
          size={scrollTrigger ? 'small' : 'large'}
        >
          {t('welcome.buttons.login')}
        </Button>
        <Button
          component={NavLink}
          to={paths.login}
          variant="contained"
          size={scrollTrigger ? 'small' : 'large'}
        >
          {t('welcome.buttons.signUp')}
        </Button>
      </header>

      <main className={classNames('welcome-main', { 'welcome-main-show-team': showTeam })}>
        <h1 className={'welcome-h1'}>{t('welcome.h1')}</h1>
        <h2>{t('welcome.h2')}</h2>

        {!showTeam && (
          <div className={'welcome-about'}>
            <p>{t('welcome.about')}</p>
          </div>
        )}

        <a
          className={'welcome-show-team'}
          onClick={() => {
            setShowTeam(!showTeam);
          }}
        >
          <p>{showTeam ? t('welcome.showAbout') : t('welcome.showTeam')}</p>
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
              {MEMBERS_LIST.map((member, i) => {
                return <TeamMemberCard key={i} name={member} />;
              })}
            </div>
            <p>Mentor</p>
            <TeamMemberCard name={'mentor'}></TeamMemberCard>
          </div>
        )}

        <Background></Background>
      </main>
    </>
  );
}
