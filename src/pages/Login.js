import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { addUserEmail } from '../actions';
import '../App.css';

const MIN_PASSWORD = 6;

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    }, () => {
      // Login validation:
      const { email, password } = this.state;
      // Source: https://www.w3resource.com/javascript/form/email-validation.php
      const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      this.setState({
        isButtonDisabled: !(validEmail.test(email) && password.length >= MIN_PASSWORD), // Se as duas condições forem verdadeiras, a negação dela será igual a false, habilitando, assim, o botão.
      });
    });
  }

  render() {
    const { isButtonDisabled, redirect, email, password } = this.state;
    const passwordOk = password.length >= MIN_PASSWORD;
    const { dispatchUserEmail } = this.props;
    return (
      <main className="login">
        <form
          className="card login-card"
          onSubmit={ (event) => {
            event.preventDefault();
            if (isButtonDisabled) return;
            dispatchUserEmail(email);
            this.setState({ redirect: true });
          } }
        >
          <p className="brand">TrybeWallet</p>
          <h1>Controle seus gastos em qualquer moeda</h1>
          <p className="muted">
            Registre despesas em dólar, euro ou bitcoin e veja o total em reais,
            com a cotação do momento.
          </p>
          <label htmlFor="email" className="field">
            Email
            <input
              type="email"
              id="email"
              name="email"
              placeholder="voce@email.com"
              autoComplete="email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password" className="field">
            Senha
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Sua senha"
              autoComplete="current-password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
            <span className={ `hint${passwordOk ? ' is-met' : ''}` }>
              { `${passwordOk ? '✓ ' : ''}Mínimo de ${MIN_PASSWORD} caracteres` }
            </span>
          </label>
          <button type="submit" className="button-primary" disabled={ isButtonDisabled }>
            Entrar
          </button>
        </form>
        { redirect ? <Redirect to="/carteira" /> : null}
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchUserEmail: (email) => dispatch(addUserEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  dispatchUserEmail: PropTypes.func.isRequired,
};
