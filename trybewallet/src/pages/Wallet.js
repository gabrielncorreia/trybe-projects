import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../App.css';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpensesTable from '../components/ExpensesTable';

const brl = (value) => Number(value)
  .toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.sumExpenses = this.sumExpenses.bind(this);
  }

  sumExpenses() {
    const { userExpenses } = this.props;
    const sumValues = userExpenses.reduce(
      (acc,
        { value, currency, exchangeRates }) => acc + value * exchangeRates[currency].ask,
      0,
    );

    return sumValues.toFixed(2);
  }

  render() {
    const { userEmail, userExpenses } = this.props;
    return (
      <div className="wallet">
        <header className="topbar">
          <p className="brand">TrybeWallet</p>
          <p className="muted" data-testid="email-field">{ userEmail }</p>
        </header>

        <main className="wallet-main">
          <section className="summary">
            <p className="muted">Total gasto</p>
            <p className="total">
              <span data-testid="header-currency-field">BRL</span>
              <span data-testid="total-field">{ brl(this.sumExpenses()) }</span>
            </p>
            <p className="muted">
              { userExpenses.length === 1
                ? '1 despesa registrada'
                : `${userExpenses.length} despesas registradas` }
            </p>
          </section>

          <AddExpenseForm />
          <ExpensesTable />
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  userExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Wallet);

Wallet.propTypes = {
  userEmail: PropTypes.string.isRequired,
  userExpenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};
