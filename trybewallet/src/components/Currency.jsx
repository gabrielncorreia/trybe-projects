import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { currencyAPI } from '../actions/index';
import { t } from '../i18n';

class Currency extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencies: [],
    };

    this.fetchCurrencies = this.fetchCurrencies.bind(this);
  }

  componentDidMount() {
    this.fetchCurrencies();
    // console.log('montou a currencies');
  }

  async fetchCurrencies() {
    const APIresponse = await currencyAPI();
    const allKeys = Object.keys(APIresponse);
    const currencies = allKeys.filter(
      (currency) => currency !== 'USDT' && currency !== 'DOGE',
    );

    this.setState({
      currencies,
    });
    // console.log(currencies);
  }

  render() {
    const { currencies } = this.state;
    const { handleChange } = this.props;
    // console.log(currencies);
    return (
      <label htmlFor="currency">
        { t('form.currency') }
        <select
          id="currency"
          data-testid="currency-input"
          name="currency"
          onChange={ handleChange }
        >
          { currencies.map((curr) => (
            <option key={ curr } value={ curr } data-testid={ curr }>{curr}</option>
          ))}
        </select>
      </label>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.currencies,
});

export default connect(mapStateToProps, null)(Currency);

Currency.propTypes = {
  handleChange: propTypes.func.isRequired,
};
