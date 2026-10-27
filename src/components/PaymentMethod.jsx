import React, { Component } from 'react';
import propTypes from 'prop-types';

export default class PaymentMethod extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="method">
        Pagamento
        <select
          id="method"
          data-testid="method-input"
          name="method"
          onChange={ handleChange }
        >
          <option selected>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
      </label>
    );
  }
}

PaymentMethod.propTypes = {
  handleChange: propTypes.func.isRequired,
};
