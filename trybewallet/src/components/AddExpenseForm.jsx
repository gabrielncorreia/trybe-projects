import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { addExpense, currencyAPI } from '../actions/index';
import PaymentMethod from './PaymentMethod';
import Tags from './Tags';
import Currency from './Currency';
import '../App.css';
import { t } from '../i18n';

const initialState = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  exchangeRates: {},
};

class AddExpenseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
      saving: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.saveExpenses = this.saveExpenses.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  async saveExpenses(event) {
    event.preventDefault();
    const { saveExpense } = this.props;
    const { saving, ...expenseFields } = this.state;
    if (saving) return;
    this.setState({ saving: true });
    const exchangeRates = await currencyAPI();
    saveExpense({ ...expenseFields, exchangeRates });
    // Keep currency, method and tag: people often log several similar expenses in a row.
    this.setState({ value: '', description: '', saving: false });
  }

  render() {
    const { value, description, saving } = this.state;
    return (
      <form className="card expense-form" onSubmit={ this.saveExpenses }>
        <h2>{ t('form.title') }</h2>
        <div className="expense-fields">
          <label htmlFor="value">
            { t('form.value') }
            <input
              type="number"
              id="value"
              name="value"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder={ t('form.valuePlaceholder') }
              required
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <Currency handleChange={ this.handleChange } />
          <PaymentMethod handleChange={ this.handleChange } />
          <Tags handleChange={ this.handleChange } />
          <label htmlFor="description" className="wide">
            { t('form.description') }
            <input
              type="text"
              id="description"
              name="description"
              placeholder={ t('form.descriptionPlaceholder') }
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
        </div>
        <button type="submit" className="button-primary" disabled={ saving }>
          { saving ? t('form.saving') : t('form.submit') }
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveExpense: (expenses) => dispatch(addExpense(expenses)),
});

export default connect(null, mapDispatchToProps)(AddExpenseForm);

AddExpenseForm.propTypes = {
  saveExpense: propTypes.func.isRequired,
};
