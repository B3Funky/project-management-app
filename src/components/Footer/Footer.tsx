import React from 'react';

import './footer.css';

export function Footer() {
  function githubAccount(name: string, link: string) {
    return (
      <a className={'link-to-github'} href={link} target={'blank'}>
        <div className={'git-icon'}></div>
        <p>{name}</p>
      </a>
    );
  }

  return (
    <footer>
      <a className={'rss-link'} href={'https://rs.school/react/'} target={'blank'} />
      <div className={'developers'}>
        <p>Devs:</p>
        <div className={'github-accounts'}>
          {githubAccount('B3Funky', 'https://github.com/B3Funky')}
          {githubAccount('Anasstassia', 'https://github.com/Anasstassia')}
        </div>
      </div>
      <p className={'year'}>©2022</p>
    </footer>
  );
}
