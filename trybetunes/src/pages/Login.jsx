import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      isButtonDisabled: true,
      loading: false,
      isUserAuthenticated: false,
    };
  }

  onChangeHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    }, () => this.loginValidation());
  }

  loginValidation = () => {
    const { name } = this.state;
    const minValue = 3;

    this.setState({ isButtonDisabled: name.trim().length < minValue });
  }

  enterButton = async (event) => {
    event.preventDefault();
    const { name, isButtonDisabled, loading } = this.state;
    if (isButtonDisabled || loading) return;

    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: name.trim() });

      this.setState({
        loading: false,
        isUserAuthenticated: true,
      });
    });
  }

  render() {
    const { isButtonDisabled, loading, isUserAuthenticated } = this.state;
    return (
      <div data-testid="page-login" className="login">
        <form className="login-card" onSubmit={ this.enterButton }>
          <p className="brand">TrybeTunes</p>
          <h1>Ouça prévias e guarde suas músicas favoritas</h1>
          <p className="muted">Busque qualquer artista do catálogo do iTunes.</p>
          <label htmlFor="login-name" className="field">
            Como podemos te chamar?
            <input
              type="text"
              id="login-name"
              name="name"
              placeholder="Seu nome"
              autoComplete="name"
              onChange={ this.onChangeHandler }
              data-testid="login-name-input"
            />
          </label>
          <button
            type="submit"
            className="button-primary"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled || loading }
          >
            { loading ? 'Entrando...' : 'Entrar' }
          </button>
          <p className="muted small">Use pelo menos 3 letras.</p>
        </form>
        { isUserAuthenticated && <Redirect to="/search" /> }
      </div>
    );
  }
}
