import { t } from '../../i18n';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import loginImage from '../../images/login_bg.jpg';

const MIN_PASSWORD = 7;
const VALID_EMAIL = /\S+@\S+\.\S+/;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const passwordOk = password.length >= MIN_PASSWORD;
  const isValid = VALID_EMAIL.test(email) && passwordOk;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  return (
    <main className="login theme-meal">
      <div className="login-photo" style={ { backgroundImage: `url(${loginImage})` } } />
      <form className="login-form" onSubmit={ handleSubmit }>
        <p className="brand">Recipes App</p>
        <h1>{ t('login.title') }</h1>
        <p className="muted">
          { t('login.intro') }
        </p>
        <label htmlFor="user" className="field">
          { t('login.email') }
          <input
            id="user"
            type="email"
            autoComplete="email"
            placeholder={ t('login.emailPlaceholder') }
            data-testid="email-input"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password" className="field">
          { t('login.password') }
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder={ t('login.passwordPlaceholder') }
            data-testid="password-input"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <span className={ `hint${passwordOk ? ' is-met' : ''}` }>
            { `${passwordOk ? '✓ ' : ''}${t('login.passwordRule', { min: MIN_PASSWORD })}` }
          </span>
        </label>
        <button
          type="submit"
          className="button-primary"
          data-testid="login-submit-btn"
          disabled={ !isValid }
        >
          { t('login.submit') }
        </button>
        <p className="muted small credits">
          { t('login.credits') }
          { ' ' }
          <a href="https://linktr.ee/testbreakers" target="_blank" rel="noopener noreferrer">TestBreakers</a>
        </p>
      </form>
    </main>
  );
}
