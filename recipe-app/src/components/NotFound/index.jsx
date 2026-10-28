import { t } from '../../i18n';
import React from 'react';
import { Link } from 'react-router-dom';
import Page from '../Page';

function NotFound() {
  return (
    <Page title={ t('notFound.title') }>
      <div className="empty">
        <p className="muted">{ t('notFound.text') }</p>
        <Link to="/comidas">{ t('notFound.browse') }</Link>
      </div>
    </Page>
  );
}

export default NotFound;
