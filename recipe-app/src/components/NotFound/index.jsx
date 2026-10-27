import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../Page';

function NotFound() {
  return (
    <Page title="Página não encontrada">
      <div className="empty">
        <p className="muted">Esse endereço não existe.</p>
        <Link to="/comidas">Ver receitas</Link>
      </div>
    </Page>
  );
}

export default NotFound;
