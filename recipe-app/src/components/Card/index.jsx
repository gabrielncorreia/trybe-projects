import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { KINDS } from '../../services/recipes';

function Card({ index, recipe, apiType }) {
  const { field, path } = KINDS[apiType];
  const name = recipe[`str${field}`];
  return (
    <Link to={ `/${path}/${recipe[`id${field}`]}` } className="recipe-card">
      <article data-testid={ `${index}-recipe-card` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ `${recipe[`str${field}Thumb`]}/preview` }
          alt=""
          loading="lazy"
        />
        <p className="recipe-card-name" data-testid={ `${index}-card-name` }>{ name }</p>
        { recipe.strCategory && <p className="muted small">{ recipe.strCategory }</p> }
      </article>
    </Link>
  );
}

Card.propTypes = {
  index: PropTypes.number.isRequired,
  apiType: PropTypes.string.isRequired,
  recipe: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Card;
