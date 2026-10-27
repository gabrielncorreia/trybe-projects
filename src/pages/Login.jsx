import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsGear } from 'react-icons/bs';
import '../App.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../trivia.png';
import { requestToken, getQuestions } from '../services/api';
import actions from '../redux/actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      isButtonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleNewToken = this.handleNewToken.bind(this);
  }

  getTokenFromLocalStorage() {
    const token = localStorage.getItem('token');
    return JSON.parse(token);
  }

  async handleLogin() {
    const { numQuestions, saveQuestions, history } = this.props;
    const { email, name } = this.state;
    // 3: token expired/unknown, 4: token has already served every question.
    const TOKEN_NOT_FOUND = 3;
    const TOKEN_EMPTY = 4;
    let userToken = this.getTokenFromLocalStorage();
    if (!userToken) userToken = await requestToken();
    let questions = await getQuestions(numQuestions, '', userToken);
    if ([TOKEN_NOT_FOUND, TOKEN_EMPTY].includes(questions.response_code)) {
      questions = await this.handleNewToken(numQuestions);
    }
    // console.log(questions.results);
    saveQuestions(questions.results);
    const obj = { player: { name, assertions: 0, score: 0, gravatarEmail: email } };
    localStorage.setItem('state', JSON.stringify(obj));
    history.push('/jogo');
  }

  async handleNewToken(numQuestions) {
    const token = await requestToken();
    const newQuestions = await getQuestions(numQuestions, '', token);
    return newQuestions;
  }

  toggleSendButton() {
    const { email, name } = this.state;
    if (email && name) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  }

  handleChange(whichInput) {
    const { value, id } = whichInput.target;
    if (value || value === '') {
      this.setState({
        [id]: value,
      }, () => this.toggleSendButton());
    }
  }

  render() {
    const { isButtonDisabled } = this.state;
    return (
      <main className="main-div">
        <div className="login-div">
          <div className="config-div">
            <Link to="/config" data-testid="btn-settings">
              <BsGear />
            </Link>
          </div>
          <div className="login-title">
            <img src={ logo } alt="" />
          </div>
          <form className="form-div">
            <input
              type="text"
              placeholder="Nome"
              name="name"
              id="name"
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
            {/* <Link to="/jogo"> */}
            <button
              type="button"
              data-testid="btn-play"
              disabled={ isButtonDisabled }
              onClick={ this.handleLogin }
            >
              Jogar
            </button>
            {/* </Link> */}
          </form>
        </div>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  numQuestions: PropTypes.number.isRequired,
  saveQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  numQuestions: state.configReducer.numberOfQuestions,
});

const mapDispatchToProps = (dispatch) => ({
  saveQuestions: (questions) => dispatch(actions.saveQuestionsOnStore(questions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
