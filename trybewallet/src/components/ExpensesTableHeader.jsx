import React, { Component } from 'react';
import { t } from '../i18n';

export default class ExpensesTableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          <th>{ t('table.description') }</th>
          <th>{ t('table.tag') }</th>
          <th>{ t('table.method') }</th>
          <th className="num">{ t('table.value') }</th>
          <th>{ t('table.currency') }</th>
          <th className="num">{ t('table.rate') }</th>
          <th className="num">{ t('table.converted') }</th>
          <th><span className="visually-hidden">{ t('table.actions') }</span></th>
        </tr>
      </thead>
    );
  }
}
