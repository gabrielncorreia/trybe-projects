import React from 'react';
import PropTypes from 'prop-types';
import { getLocale, t } from '../i18n';

const SEGMENTS = 5;

class Rating extends React.Component {
  render() {
    const { rating } = this.props;
    const shown = rating.toLocaleString(getLocale(), {
      minimumFractionDigits: 1,
    });
    return (
      <div className="movie-card-rating" role="img" aria-label={ t('rating', { rating: shown }) }>
        <span className="rating-meter" aria-hidden="true">
          { Array.from({ length: SEGMENTS }, (_, index) => (
            <span
              key={ index }
              className="rating-segment"
              style={ { '--fill': Math.min(Math.max(rating - index, 0), 1) } }
            />
          )) }
        </span>
        <span className="rating" aria-hidden="true">{ shown }</span>
      </div>
    );
  }
}

Rating.propTypes = {
  rating: PropTypes.number,
};

Rating.defaultProps = {
  rating: 0,
};

export default Rating;
