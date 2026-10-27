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
        <h1>Receitas de comidas e drinks para o dia a dia</h1>
        <p className="muted">
          Busque por nome, ingrediente ou cozinha, siga o passo a passo e guarde suas favoritas.
        </p>
        <label htmlFor="user" className="field">
          Email
          <input
            id="user"
            type="email"
            autoComplete="email"
            placeholder="voce@email.com"
            data-testid="email-input"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label htmlFor="password" className="field">
          Senha
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Sua senha"
            data-testid="password-input"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
          <span className={ `hint${passwordOk ? ' is-met' : ''}` }>
            { `${passwordOk ? '✓ ' : ''}Mínimo de ${MIN_PASSWORD} caracteres` }
          </span>
        </label>
        <button
          type="submit"
          className="button-primary"
          data-testid="login-submit-btn"
          disabled={ !isValid }
        >
          Entrar
        </button>
        <p className="muted small credits">
          Projeto em grupo da Trybe, por
          { ' ' }
          <a href="https://linktr.ee/testbreakers" target="_blank" rel="noopener noreferrer">TestBreakers</a>
        </p>
      </form>
    </main>
  );
}
