import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="page empty">
        <h1 className="page-title">Página não encontrada</h1>
        <p className="muted">
          Esse endereço não existe.
          {' '}
          <Link to="/search">Voltar para a busca</Link>
        </p>
      </div>
    );
  }
}
