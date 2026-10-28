import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { t } from '../i18n';

export default class NotFound extends Component {
  render() {
    return (
      <div data-testid="page-not-found" className="page empty">
        <h1 className="page-title">{ t('notFound.title') }</h1>
        <p className="muted">
          { t('notFound.text') }
          {' '}
          <Link to="/search">{ t('notFound.back') }</Link>
        </p>
      </div>
    );
  }
}
