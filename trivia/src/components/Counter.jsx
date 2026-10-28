import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../redux/actions';
import { t } from '../i18n';

const TIME_LIMIT = 30;
const INTERVAL = 1000;
const LOW_TIME = 5;

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: TIME_LIMIT };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    const { isRunning } = this.props;
    if (prevProps.isRunning === isRunning) return;
    // Exactly one interval at a time: stop on answer, restart fresh on the next question.
    this.stopTimer();
    if (isRunning) this.setState({ count: TIME_LIMIT }, this.startTimer);
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer() {
    const { counter, showResults } = this.props;
    counter(TIME_LIMIT);
    this.timer = setInterval(() => {
      const { count } = this.state;
      const countUpdate = count - 1;
      counter(countUpdate);
      this.setState({ count: countUpdate });
      if (countUpdate <= 0) {
        this.stopTimer();
        showResults();
      }
    }, INTERVAL);
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  render() {
    const { count } = this.state;
    return (
      <div className={ `timer${count <= LOW_TIME ? ' is-low' : ''}` }>
        <div className="timer-track" aria-hidden="true">
          <span className="timer-fill" style={ { transform: `scaleX(${count / TIME_LIMIT})` } } />
        </div>
        <span className="timer-count" role="timer" aria-label={ t('game.secondsLeft', { count }) }>
          { `${count}s` }
        </span>
      </div>
    );
  }
}

Counter.propTypes = {
  showResults: PropTypes.func.isRequired,
  isRunning: PropTypes.bool.isRequired,
  counter: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    counter: (counter) => dispatch(actions.addTimer(counter)),
  };
}

export default connect(null, mapDispatchToProps)(Counter);
