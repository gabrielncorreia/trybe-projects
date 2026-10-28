import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestToken, getQuestions, getCategories } from '../services/api';
import actions from '../redux/actions';
import { t } from '../i18n';

// Open Trivia DB response codes.
const NO_RESULTS = 1; // not enough questions for these options
const TOKEN_NOT_FOUND = 3; // token expired/unknown
const TOKEN_EMPTY = 4; // token has already served every question

const DIFFICULTIES = ['', 'easy', 'medium', 'hard'];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isButtonDisabled: true,
      loading: false,
      error: '',
      categories: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOption = this.handleOption.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  getTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    return JSON.parse(token);
  }

  async handleLogin(event) {
    event.preventDefault();
    const { numQuestions, category, difficulty, saveQuestions, history } = this.props;
    const { email, name, isButtonDisabled, loading } = this.state;
    if (isButtonDisabled || loading) return;
    this.setState({ loading: true, error: '' });

    const options = { amount: numQuestions, category, difficulty };
    let token = this.getTokenFromLocalStorage() || await requestToken();
    let questions = await getQuestions({ ...options, token });
    if ([TOKEN_NOT_FOUND, TOKEN_EMPTY].includes(questions.response_code)) {
      token = await requestToken();
      questions = await getQuestions({ ...options, token });
    }

    if (!questions.results || questions.results.length === 0) {
      this.setState({
        loading: false,
        error: questions.response_code === NO_RESULTS
          ? t('start.noResults')
          : t('start.loadError'),
      });
      return;
    }

    saveQuestions(questions.results);
    const obj = { player: { name, assertions: 0, score: 0, gravatarEmail: email } };
    localStorage.setItem('state', JSON.stringify(obj));
    history.push('/jogo');
  }

  handleChange({ target: { value, id } }) {
    this.setState({ [id]: value }, () => {
      const { email, name } = this.state;
      this.setState({ isButtonDisabled: !(email.trim() && name.trim()) });
    });
  }

  handleOption({ target: { name, value } }) {
    const { setOptions } = this.props;
    setOptions({ [name]: name === 'numberOfQuestions' ? Number(value) : value });
  }

  render() {
    const { isButtonDisabled, loading, error, categories } = this.state;
    const { numQuestions, category, difficulty } = this.props;
    return (
      <main className="stage start">
        <form className="panel start-panel" onSubmit={ this.handleLogin }>
          <p className="wordmark">Trivia</p>
          <h1>{ t('start.title') }</h1>

          <div className="fields">
            <label htmlFor="name" className="field">
              { t('start.name') }
              <input
                type="text"
                placeholder={ t('start.namePlaceholder') }
                name="name"
                id="name"
                autoComplete="nickname"
                data-testid="input-player-name"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="email" className="field">
              { t('start.email') }
              <input
                id="email"
                name="email"
                type="email"
                placeholder={ t('start.emailPlaceholder') }
                autoComplete="email"
                data-testid="input-gravatar-email"
                onChange={ this.handleChange }
              />
            </label>
          </div>

          <fieldset className="options" data-testid="settings-title">
            <legend>{ t('start.options') }</legend>
            <label htmlFor="numberOfQuestions" className="field">
              { t('start.questions') }
              <select id="numberOfQuestions" name="numberOfQuestions" value={ numQuestions } onChange={ this.handleOption }>
                { [5, 10, 15].map((n) => <option key={ n } value={ n }>{ n }</option>) }
              </select>
            </label>
            <label htmlFor="difficulty" className="field">
              { t('start.difficulty') }
              <select id="difficulty" name="difficulty" value={ difficulty } onChange={ this.handleOption }>
                { DIFFICULTIES.map((value) => (
                  <option key={ value } value={ value }>{ t(`difficulty.${value}`) }</option>
                )) }
              </select>
            </label>
            <label htmlFor="category" className="field wide">
              { t('start.category') }
              <select id="category" name="category" value={ category } onChange={ this.handleOption }>
                <option value="">{ t('start.allCategories') }</option>
                { categories.map(({ id, name }) => (
                  <option key={ id } value={ id }>{ name }</option>
                )) }
              </select>
            </label>
          </fieldset>

          { error && <p className="error" role="alert">{ error }</p> }

          <button
            type="submit"
            className="button-primary"
            data-testid="btn-play"
            disabled={ isButtonDisabled || loading }
          >
            { loading ? t('start.loading') : t('start.play') }
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  numQuestions: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  saveQuestions: PropTypes.func.isRequired,
  setOptions: PropTypes.func.isRequired,
};

const mapStateToProps = ({ configReducer }) => ({
  numQuestions: configReducer.numberOfQuestions,
  category: String(configReducer.category),
  difficulty: configReducer.difficulty,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: (questions) => dispatch(actions.saveQuestionsOnStore(questions)),
  setOptions: (options) => dispatch(actions.setGameOptions(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
