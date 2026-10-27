import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ExpensesTableHeader from './ExpensesTableHeader';
import { removeExpense } from '../actions/index';
import '../App.css';

const money = (value) => Number(value)
  .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// The API names each rate "Dólar Americano/Real Brasileiro"; keep the source currency.
const currencyName = ({ currency, exchangeRates }) => (
  exchangeRates[currency].name.split('/')[0]
);

class ExpensesTable extends Component {
  render() {
    const { getExpenses, deleteExpense } = this.props;
    if (!getExpenses.length) {
      return (
        <section className="card empty">
          <p>Nenhuma despesa ainda.</p>
          <p className="muted">Adicione a primeira no formulário acima.</p>
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
                  <td data-label="Descrição">{ exp.description || '—' }</td>
                  <td data-label="Categoria"><span className="tag">{ exp.tag }</span></td>
                  <td data-label="Pagamento">{ exp.method }</td>
                  <td data-label="Valor" className="num">
                    { `${exp.currency} ${money(exp.value)}` }
                  </td>
                  <td data-label="Moeda">{ currencyName(exp) }</td>
                  <td data-label="Câmbio" className="num">{ money(rate) }</td>
                  <td data-label="Em reais" className="num strong">
                    { `R$ ${money(exp.value * rate)}` }
                  </td>
                  <td className="actions">
                    <button
                      type="button"
                      className="button-delete"
                      data-testid="delete-btn"
                      aria-label={ `Excluir ${exp.description || 'despesa'}` }
                      onClick={ () => deleteExpense(exp.id) }
                    >
                      Excluir
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
