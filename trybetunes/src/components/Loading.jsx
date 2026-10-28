import React, { Component } from 'react';
import { t } from '../i18n';

export default class Loading extends Component {
  render() {
    return (
      <p className="loading" role="status">{ t('loading') }</p>
    );
  }
}
