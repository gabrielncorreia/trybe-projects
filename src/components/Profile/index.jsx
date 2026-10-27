import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../Page';
import { getDone, getFavorites } from '../../services/recipes';

export default function Profile() {
  const { email = '' } = JSON.parse(localStorage.getItem('user')) || {};
  const done = getDone().length;
  const favorites = getFavorites().length;

  return (
    <Page title="Perfil">
      <div className="profile">
        <span className="avatar" aria-hidden="true">{ email.charAt(0) || '?' }</span>
        <p data-testid="profile-email" className="profile-email">{ email || 'Visitante' }</p>
        <nav className="menu-list">
          <Link to="/receitas-feitas" data-testid="profile-done-btn">
            Receitas feitas
            <span className="muted">{ done }</span>
          </Link>
          <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
            Receitas favoritas
            <span className="muted">{ favorites }</span>
          </Link>
          <Link to="/" data-testid="profile-logout-btn" onClick={ () => localStorage.clear() }>
            Sair
          </Link>
        </nav>
      </div>
    </Page>
  );
}
