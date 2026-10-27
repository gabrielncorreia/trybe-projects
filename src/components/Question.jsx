import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Counter from './Counter';
import AnswerButtons from './AnswerButtons';

const DIFFICULTY_LABEL = { easy: 'Fácil', medium: 'Média', hard: 'Difícil' };

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      answered: false,
      selected: null,
    };
    this.showResults = this.showResults.bind(this);
    this.nextButton = this.nextButton.bind(this);
  }

  componentDidMount() {
    this.setAnswers();
  }

  componentDidUpdate(prevProps) {
    const { question } = this.props;
    if (question !== prevProps.question) {
      this.setAnswers();
    }
  }

  setAnswers() {
    const { correctAnswer, incorrectAnswers } = this.props;
    const all = [...incorrectAnswers, correctAnswer];
    const answers = all.includes('True') ? ['True', 'False'] : this.shuffleArray(all);
    this.setState({ answers });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Called with the chosen answer's index, or with nothing when time runs out.
  showResults(selected = null) {
    const { answered } = this.state;
    const { onAnswered } = this.props;
    if (answered) return;
    this.setState({ answered: true, selected });
    onAnswered();
  }

  nextButton() {
    const { nextQuestion } = this.props;
    this.setState({ answered: false, selected: null });
    nextQuestion();
  }

  render() {
    const { answers, answered, selected } = this.state;
    const { question, correctAnswer, category, difficulty, isLast } = this.props;
    const timedOut = answered && selected === null;
    return (
      <section className="panel question-panel">
        <div className="question-meta">
          <p data-testid="question-category">{ category }</p>
          <span className={ `difficulty is-${difficulty}` }>{ DIFFICULTY_LABEL[difficulty] }</span>
        </div>
        <Counter showResults={ this.showResults } isRunning={ !answered } />
        <h1 className="question-text" data-testid="question-text">{ question }</h1>
        <AnswerButtons
          answers={ answers }
          correctAnswer={ correctAnswer }
          answered={ answered }
          selected={ selected }
          showResults={ this.showResults }
          difficulty={ difficulty }
        />
        { answered && (
          <div className="next-row">
            <p className="muted" role="status">
              { timedOut ? 'O tempo acabou.' : '' }
            </p>
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <button type="button" className="button-primary" onClick={ this.nextButton } data-testid="btn-next" autoFocus>
              { isLast ? 'Ver resultado' : 'Próxima pergunta' }
            </button>
          </div>
        ) }
      </section>
    );
  }
}

Question.propTypes = {
  correctAnswer: PropTypes.string.isRequired,
  incorrectAnswers: PropTypes.arrayOf(PropTypes.string).isRequired,
  question: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  onAnswered: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
};

export default Question;
