import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { gravatarUrl } from './Header';

export default class Rank extends Component {
  render() {
    const { name, index, score, email } = this.props;
    return (
      <li className="rank">
        <span className="rank-position">{ index + 1 }</span>
        <img src={ gravatarUrl(email) } alt="" />
        <span className="rank-name" data-testid={ `player-name-${index}` }>{ name }</span>
        <span className="rank-score" data-testid={ `player-score-${index}` }>{ `${score} pts` }</span>
      </li>
    );
  }
}

Rank.propTypes = {
  email: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
