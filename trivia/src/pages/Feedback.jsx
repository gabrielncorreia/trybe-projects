import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { gravatarUrl } from '../components/Header';

class Feedback extends Component {
  feedbackMessage(assertions, total) {
    // Half or more right counts as a good round; 3 is the old fixed bar for 5 questions.
    const goal = total ? Math.ceil(total / 2) : 3;
    return assertions >= goal ? 'Mandou bem!' : 'Podia ser melhor...';
  }

  render() {
    const { total } = this.props;
    const { player } = JSON.parse(localStorage.getItem('state')) || {};
    if (!player) return <Redirect to="/" />;
    const { name, gravatarEmail, assertions, score } = player;
    return (
      <main className="stage result">
        <section className="panel result-panel">
          <img className="avatar-large" src={ gravatarUrl(gravatarEmail) } alt="" data-testid="header-profile-picture" />
          <p className="muted" data-testid="header-player-name">{ name }</p>
          <h1 data-testid="feedback-text">{ this.feedbackMessage(assertions, total) }</h1>
          <div className="stats">
            <div>
              <p className="stat" data-testid="feedback-total-score">{ score }</p>
              <p className="muted">pontos</p>
            </div>
            <div>
              <p className="stat">
                <span data-testid="feedback-total-question">{ assertions }</span>
                { total ? <span className="stat-of">{ ` de ${total}` }</span> : null }
              </p>
              <p className="muted">acertos</p>
            </div>
          </div>
          <div className="result-actions">
            <Link to="/" className="button-primary" data-testid="btn-play-again">Jogar de novo</Link>
            <Link to="/ranking" className="button-secondary" data-testid="btn-ranking">Ver ranking</Link>
          </div>
        </section>
      </main>
    );
  }
}

Feedback.propTypes = {
  total: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  total: state.questionsReducer.triviaQuestions.length,
});

export default connect(mapStateToProps)(Feedback);
