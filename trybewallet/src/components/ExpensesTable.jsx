import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpensesTableHeader from './ExpensesTableHeader';
import { removeExpense } from '../actions/index';
import '../App.css';
import { getLocale, t } from '../i18n';

const money = (value) => Number(value)
  .toLocaleString(getLocale(), { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Intl names the currency in the current language; it echoes the code back for ones it
// does not know (most crypto), so fall back to the API's Portuguese "Dólar Americano/Real Brasileiro".
const currencyName = ({ currency, exchangeRates }) => {
  const name = new Intl.DisplayNames([getLocale()], { type: 'currency' }).of(currency);
  return name && name !== currency ? name : exchangeRates[currency].name.split('/')[0];
};

class ExpensesTable extends Component {
  render() {
    const { getExpenses, deleteExpense } = this.props;
    if (!getExpenses.length) {
      return (
        <section className="card empty">
          <p>{ t('table.emptyTitle') }</p>
          <p className="muted">{ t('table.emptyText') }</p>
        </section>
      );
    }
    return (
      <section className="card table-card">
        <table className="expenses">
          <ExpensesTableHeader />
          <tbody>
            { getExpenses.map((exp) => {
              const rate = exp.exchangeRates[exp.currency].ask;
              return (
                <tr key={ exp.id }>
                  <td data-label={ t('table.description') }>{ exp.description || '—' }</td>
                  <td data-label={ t('table.tag') }>
                    <span className="tag">{ t(`tags.${exp.tag}`) }</span>
                  </td>
                  <td data-label={ t('table.method') }>{ t(`methods.${exp.method}`) }</td>
                  <td data-label={ t('table.value') } className="num">
                    { `${exp.currency} ${money(exp.value)}` }
                  </td>
                  <td data-label={ t('table.currency') }>{ currencyName(exp) }</td>
                  <td data-label={ t('table.rate') } className="num">{ money(rate) }</td>
                  <td data-label={ t('table.converted') } className="num strong">
                    { `R$ ${money(exp.value * rate)}` }
                  </td>
                  <td className="actions">
                    <button
                      type="button"
                      className="button-delete"
                      data-testid="delete-btn"
                      aria-label={ t('table.deleteLabel', { name: exp.description || t('table.expense') }) }
                      onClick={ () => deleteExpense(exp.id) }
                    >
                      { t('table.delete') }
                    </button>
                  </td>
                </tr>
              );
            }) }
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  getExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (id) => dispatch(removeExpense(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);

ExpensesTable.propTypes = {
  getExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
};
