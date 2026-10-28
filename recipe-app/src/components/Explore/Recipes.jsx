import { t } from '../../i18n';
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
  const { path, key, field } = KINDS[apiType];
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
    <Page title={ t('explore.kindTitle', { kind: t(`kinds.${apiType}Lower`) }) } apiType={ apiType }>
      <div className="tile-grid">
        <Link to={ `/explorar/${path}/ingredientes` } className="tile" data-testid="explore-by-ingredient">
          <img src={ searchIngredient } alt="" />
          <span className="tile-title">{ t('explore.byIngredient') }</span>
          <span className="muted small">{ t('explore.byIngredientHint') }</span>
        </Link>
        { apiType === 'meal' && (
          <Link to={ `/explorar/${path}/area` } className="tile" data-testid="explore-by-area">
            <img src={ searchLocation } alt="" />
            <span className="tile-title">{ t('explore.byCuisine') }</span>
            <span className="muted small">{ t('explore.byCuisineHint') }</span>
          </Link>
        ) }
        <button type="button" className="tile" data-testid="explore-surprise" onClick={ surprise } disabled={ loading }>
          <img src={ searchSurprise } alt="" />
          <span className="tile-title">{ t(loading ? 'explore.surprising' : 'explore.surprise') }</span>
          <span className="muted small">{ t('explore.surpriseHint') }</span>
        </button>
      </div>
    </Page>
  );
}

ExploreRecipes.propTypes = {
  recipeof: PropTypes.string.isRequired,
};

export default ExploreRecipes;
