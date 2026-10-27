import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <main className="stage result">
        <section className="panel ranking-panel">
          <h1>Página não encontrada</h1>
          <p className="muted">Esse endereço não existe.</p>
          <Link to="/" className="button-primary">Voltar ao início</Link>
        </section>
      </main>
    );
  }
}

export default NotFound;
