import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useTranslation } from 'react-i18next';
import { getAccessToken } from 'axios-jwt';

import { LanguageToggle } from '../../components/LanguageToggle';
import { ButtonComponent } from '../../components/Button';
import { Background } from '../../components/Background';
import { TeamMemberCard } from '../../components/TeamMemberCard';
import checkAuth from '../../utils/checkAuth';
import { paths } from '../../routes/paths';
import { MEMBERS_LIST } from '../../constants';

import './welcome.css';

export function Welcome() {
  const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
  const [showTeam, setShowTeam] = useState<boolean>(false);
  const scrollTrigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  const { t } = useTranslation();
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  const handleSignIn = useCallback(() => {
    navigate(paths.login);
  }, [navigate]);

  const handleSignUp = useCallback(() => {
    navigate(paths.signUp);
  }, [navigate]);

  const handleToMainPage = useCallback(() => {
    navigate(paths.main);
  }, [navigate]);

  useEffect(() => {
    if (!accessToken) {
      setIsAuth(false);
    } else {
      checkAuth().then((isAuth) => setIsAuth(isAuth));
    }
  }, [accessToken]);

  return (
    <>
      <header className={classNames('welcome-header', { 'welcome-header-mini': scrollTrigger })}>
        <LanguageToggle size={scrollTrigger ? 'small' : 'medium'} />
        <div className={'welcome-header-sign-buttons-wrapper'}>
          {isAuth === undefined ? null : isAuth ? (
            <ButtonComponent
              variant="contained"
              size={scrollTrigger ? 'small' : 'large'}
              onClick={handleToMainPage}
            >
              {t('welcome.buttons.toMainPage')}
            </ButtonComponent>
          ) : (
            <>
              <ButtonComponent
                variant="contained"
                size={scrollTrigger ? 'small' : 'large'}
                onClick={handleSignIn}
              >
                {t('welcome.buttons.signIn')}
              </ButtonComponent>
              <ButtonComponent
                variant="contained"
                size={scrollTrigger ? 'small' : 'large'}
                onClick={handleSignUp}
              >
                {t('welcome.buttons.signUp')}
              </ButtonComponent>
            </>
          )}
        </div>
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
