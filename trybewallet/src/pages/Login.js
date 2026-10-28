import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { addUserEmail } from '../actions';
import '../App.css';
import { t } from '../i18n';

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
          <h1>{ t('login.title') }</h1>
          <p className="muted">{ t('login.intro') }</p>
          <label htmlFor="email" className="field">
            { t('login.email') }
            <input
              type="email"
              id="email"
              name="email"
              placeholder={ t('login.emailPlaceholder') }
              autoComplete="email"
              data-testid="email-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password" className="field">
            { t('login.password') }
            <input
              type="password"
              id="password"
              name="password"
              placeholder={ t('login.passwordPlaceholder') }
              autoComplete="current-password"
              data-testid="password-input"
              onChange={ this.handleChange }
            />
            <span className={ `hint${passwordOk ? ' is-met' : ''}` }>
              { `${passwordOk ? '✓ ' : ''}${t('login.passwordRule', { min: MIN_PASSWORD })}` }
            </span>
          </label>
          <button type="submit" className="button-primary" disabled={ isButtonDisabled }>
            { t('login.submit') }
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
