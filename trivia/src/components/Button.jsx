import React, { Component } from 'react';
import PropTypes from 'prop-types';

const LETTERS = 'ABCD';

export default class Button extends Component {
  render() {
    const { index, isCorrect, status, handleAnswer, isDisabled, element } = this.props;
    return (
      <button
        type="button"
        data-testid={ isCorrect ? 'correct-answer' : `wrong-answer-${index}` }
        className={ `answer is-${status}` }
        onClick={ handleAnswer }
        disabled={ isDisabled }
      >
        <span className="answer-letter" aria-hidden="true">{ LETTERS[index] }</span>
        <span>{ element }</span>
      </button>
    );
  }
}

Button.propTypes = {
  index: PropTypes.number.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  status: PropTypes.oneOf(['idle', 'correct', 'wrong', 'dim']).isRequired,
  handleAnswer: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  element: PropTypes.string.isRequired,
};
