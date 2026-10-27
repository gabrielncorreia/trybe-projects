import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Page from '../Page';
import fetchRecipe from '../../services/api';
import { KINDS } from '../../services/recipes';
import searchIngredient from '../../images/icons/search_ingredients.png';
import searchLocation from '../../images/icons/search_location.png';
import searchSurprise from '../../images/icons/search_surprise.png';

function ExploreRecipes({ recipeof }) {
  const apiType = recipeof === 'meal' ? 'meal' : 'cocktail';
  const { path, key, field, title } = KINDS[apiType];
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const surprise = async () => {
    setLoading(true);
    const result = await fetchRecipe(apiType, 'random');
    const recipe = result && result[key] && result[key][0];
    if (recipe) history.push(`/${path}/${recipe[`id${field}`]}`);
    else setLoading(false);
  };

  return (
    <Page title={ `Explorar ${title.toLowerCase()}` } apiType={ apiType }>
      <div className="tile-grid">
        <Link to={ `/explorar/${path}/ingredientes` } className="tile" data-testid="explore-by-ingredient">
          <img src={ searchIngredient } alt="" />
          <span className="tile-title">Por ingrediente</span>
          <span className="muted small">Escolha o que você tem em casa</span>
        </Link>
        { apiType === 'meal' && (
          <Link to={ `/explorar/${path}/area` } className="tile" data-testid="explore-by-area">
            <img src={ searchLocation } alt="" />
            <span className="tile-title">Por cozinha</span>
            <span className="muted small">Italiana, japonesa, mexicana...</span>
          </Link>
        ) }
        <button type="button" className="tile" data-testid="explore-surprise" onClick={ surprise } disabled={ loading }>
          <img src={ searchSurprise } alt="" />
          <span className="tile-title">{ loading ? 'Sorteando...' : 'Me surpreenda' }</span>
          <span className="muted small">Uma receita aleatória</span>
        </button>
      </div>
    </Page>
  );
}

ExploreRecipes.propTypes = {
  recipeof: PropTypes.string.isRequired,
};

export default ExploreRecipes;
