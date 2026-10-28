import React from 'react';
import { t } from '../i18n';

class Header extends React.Component {
  render() {
    return (
      <header className="movie-card-header">
        <h1 className="page-title">{ t('header.title') }</h1>
        <p className="page-intro">{ t('header.intro') }</p>
      </header>
    );
  }
}

export default Header;
