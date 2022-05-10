import React from 'react';

import text from '../../assets/data/locale/en.json';

import './footer.css';

export function Footer() {
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
        <p>{text.footer.developed}</p>
        <div className={'footer-github-accounts'}>
          {text.team.map((member, i) => {
            return githubAccount(member.githubName, member.githubUrl, i);
          })}
        </div>
      </div>
      <p className={'footer-year'}>©2022</p>
    </footer>
  );
}
