import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from './Button';

const BASE_POINTS = 10;
const DIFFICULTY_WEIGHT = { hard: 3, medium: 2, easy: 1 };

class AnswerButtons extends Component {
  checkAnswer(index, isCorrect) {
    const { showResults, difficulty, currentTimer } = this.props;
    if (isCorrect) {
      const pontuacao = JSON.parse(localStorage.getItem('state')).player;
      const assertions = pontuacao.assertions + 1;
      const score = Number(pontuacao.score)
        + BASE_POINTS + currentTimer * (DIFFICULTY_WEIGHT[difficulty] || 1);
      localStorage.setItem('state', JSON.stringify({ player: { ...pontuacao, score, assertions } }));
    }
    showResults(index);
  }

  statusOf(index, isCorrect) {
    const { answered, selected } = this.props;
    if (!answered) return 'idle';
    if (isCorrect) return 'correct';
    return index === selected ? 'wrong' : 'dim';
  }

  render() {
    const { answers, answered, correctAnswer } = this.props;
    return (
      <div className="answers">
        { answers.map((answer, index) => {
          const isCorrect = answer === correctAnswer;
          return (
            <Button
              key={ answer }
              index={ index }
              isCorrect={ isCorrect }
              status={ this.statusOf(index, isCorrect) }
              handleAnswer={ () => this.checkAnswer(index, isCorrect) }
              isDisabled={ answered }
              element={ answer }
            />
          );
        }) }
      </div>
    );
  }
}

AnswerButtons.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  correctAnswer: PropTypes.string.isRequired,
  answered: PropTypes.bool.isRequired,
  selected: PropTypes.number,
  showResults: PropTypes.func.isRequired,
  currentTimer: PropTypes.number.isRequired,
  difficulty: PropTypes.string.isRequired,
};

AnswerButtons.defaultProps = {
  selected: null,
};

const mapStateToProps = (state) => ({
  currentTimer: state.userScoreReducer.timer,
});

export default connect(mapStateToProps)(AnswerButtons);
