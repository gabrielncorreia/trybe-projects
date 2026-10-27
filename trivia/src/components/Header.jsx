import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

export const gravatarUrl = (email = '') => (
  `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase()).toString()}?d=identicon`
);

class Header extends Component {
  render() {
    const { email, playerName, score, progress } = this.props;
    return (
      <header className="game-header">
        <div className="player">
          <img data-testid="header-profile-picture" src={ gravatarUrl(email) } alt="" />
          <span data-testid="header-player-name">{ playerName }</span>
        </div>
        { progress && <p className="progress">{ progress }</p> }
        <p className="score">
          <span data-testid="header-score">{ score }</span>
          { ' pts' }
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  progress: PropTypes.string,
};

Header.defaultProps = {
  progress: '',
};

export default Header;
