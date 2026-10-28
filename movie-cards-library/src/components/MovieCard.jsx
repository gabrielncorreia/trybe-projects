import React from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import { t } from '../i18n';

class MovieCard extends React.Component {
  render() {
    const { movie: { id, title, subtitle, imagePath, rating } } = this.props;
    return (
      <article className="movie-card">
        <img src={ imagePath } alt="" className="movie-card-image" />
        <div className="movie-card-body">
          <h2 className="movie-card-title">{ title }</h2>
          { subtitle !== title && <p className="movie-card-subtitle">{ subtitle }</p> }
          <p className="movie-card-storyline">{ t(`movies.${id}`) }</p>
        </div>
        <Rating rating={ rating } />
      </article>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    rating: PropTypes.number,
    imagePath: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
