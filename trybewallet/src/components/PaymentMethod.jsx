import React, { Component } from 'react';
import propTypes from 'prop-types';
import { t } from '../i18n';

// Values stay in Portuguese: they are what the store keeps. Only the labels change.
const METHODS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

export default class PaymentMethod extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="method">
        { t('form.method') }
        <select
          id="method"
          data-testid="method-input"
          name="method"
          defaultValue={ METHODS[0] }
          onChange={ handleChange }
        >
          { METHODS.map((method) => (
            <option key={ method } value={ method }>{ t(`methods.${method}`) }</option>
          )) }
        </select>
      </label>
    );
  }
}

PaymentMethod.propTypes = {
  handleChange: propTypes.func.isRequired,
};
