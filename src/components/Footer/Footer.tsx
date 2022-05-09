import React from 'react';

import './footer.css';

export function Footer() {
  function githubAccount(name: string, link: string) {
    return (
      <a className={'footer-link-to-github'} href={link} target={'blank'}>
        <div className={'footer-link-to-github-icon'}></div>
        <p>{name}</p>
      </a>
    );
  }

  return (
    <footer className={'footer'}>
      <a className={'footer-rss-link'} href={'https://rs.school/react/'} target={'blank'} />
      <div className={'footer-developers'}>
        <p>Devs:</p>
        <div className={'footer-github-accounts'}>
          {githubAccount('B3Funky', 'https://github.com/B3Funky')}
          {githubAccount('Anasstassia', 'https://github.com/Anasstassia')}
        </div>
      </div>
      <p className={'footer-year'}>©2022</p>
    </footer>
  );
}
