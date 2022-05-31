import React from 'react';
import { useTranslation } from 'react-i18next';

import { MEMBERS_LIST } from '../../constants';
import './footer.css';

export function Footer() {
  const { t } = useTranslation();

  function githubAccount(githubName: string, githubUrl: string, key?: number) {
    return (
      <a key={key} className={'footer-link-to-github'} href={githubUrl} target={'blank'}>
        <div className={'footer-link-to-github-icon'}></div>
        <p>{githubName}</p>
      </a>
    );
  }

  return (
    <footer className={'footer'}>
      <a className={'footer-rss-link'} href={'https://rs.school/react/'} target={'blank'} />
      <div className={'footer-developers'}>
        <p> {t('footer.developed')}</p>
        <div className={'footer-github-accounts'}>
          {MEMBERS_LIST.map((member, i) => {
            return githubAccount(`${t(`${member}.githubName`)}`, `${t(`${member}.githubUrl`)}`, i);
          })}
        </div>
      </div>
      <p className={'footer-year'}>©2022</p>
    </footer>
  );
}
