import { t } from '../../i18n';
import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../Page';
import { getDone, getFavorites } from '../../services/recipes';

export default function Profile() {
  const { email = '' } = JSON.parse(localStorage.getItem('user')) || {};
  const done = getDone().length;
  const favorites = getFavorites().length;

  return (
    <Page title={ t('profile.title') }>
      <div className="profile">
        <span className="avatar" aria-hidden="true">{ email.charAt(0) || '?' }</span>
        <p data-testid="profile-email" className="profile-email">{ email || t('profile.guest') }</p>
        <nav className="menu-list">
          <Link to="/receitas-feitas" data-testid="profile-done-btn">
            { t('profile.done') }
            <span className="muted">{ done }</span>
          </Link>
          <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
            { t('profile.favorites') }
            <span className="muted">{ favorites }</span>
          </Link>
          <Link to="/" data-testid="profile-logout-btn" onClick={ () => localStorage.clear() }>
            { t('profile.logout') }
          </Link>
        </nav>
      </div>
    </Page>
  );
}
