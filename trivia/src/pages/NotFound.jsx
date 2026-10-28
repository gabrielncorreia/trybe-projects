import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { t } from '../i18n';

class NotFound extends Component {
  render() {
    return (
      <main className="stage result">
        <section className="panel ranking-panel">
          <h1>{ t('notFound.title') }</h1>
          <p className="muted">{ t('notFound.text') }</p>
          <Link to="/" className="button-primary">{ t('notFound.home') }</Link>
        </section>
      </main>
    );
  }
}

export default NotFound;
