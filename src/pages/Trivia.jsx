import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Question from '../components/Question';

const readPlayer = () => (JSON.parse(localStorage.getItem('state')) || {}).player;

class Trivia extends Component {
  constructor() {
    super();
    this.state = {
      idQuestion: 0,
    };
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  nextQuestion() {
    this.setState((prevState) => ({
      idQuestion: prevState.idQuestion + 1,
    }));
  }

  render() {
    const { questions } = this.props;
    const { idQuestion } = this.state;
    const player = readPlayer();
    if (questions.length === 0 || !player) return <Redirect to="/" />;
    const currentQuestion = questions[idQuestion];
    if (currentQuestion === undefined) {
      const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
      localStorage.setItem('ranking', JSON.stringify([...ranking, player]));
      return <Redirect to="/feedback" />;
    }
    const {
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
      category,
      difficulty,
    } = currentQuestion;
    return (
      <main className="stage game">
        <Header
          email={ player.gravatarEmail }
          playerName={ player.name }
          score={ player.score }
          progress={ `Pergunta ${idQuestion + 1} de ${questions.length}` }
        />
        <Question
          question={ question }
          correctAnswer={ correctAnswer }
          incorrectAnswers={ incorrectAnswers }
          category={ category }
          difficulty={ difficulty }
          isLast={ idQuestion === questions.length - 1 }
          nextQuestion={ this.nextQuestion }
          // The score lives in localStorage; re-render so the header shows it right away.
          onAnswered={ () => this.forceUpdate() }
        />
      </main>
    );
  }
}

Trivia.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.any),
};

Trivia.defaultProps = {
  questions: [],
};

const mapStateToProps = (state) => ({
  questions: state.questionsReducer.triviaQuestions,
});

export default connect(mapStateToProps)(Trivia);
