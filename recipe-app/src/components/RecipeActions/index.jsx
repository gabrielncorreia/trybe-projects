import { t } from '../../i18n';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import {
  copyLink, isFavorite, recipeUrl, toggleFavorite,
} from '../../services/recipes';

// Share + favorite buttons used on the recipe and cooking pages.
function RecipeActions({ recipe }) {
  const [favorite, setFavorite] = useState(() => isFavorite(recipe.id));
  const [copied, setCopied] = useState(false);

  const share = async () => {
    setCopied(await copyLink(recipeUrl(recipe)));
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="recipe-actions">
      <button type="button" className="button-ghost" onClick={ share }>
        <img data-testid="share-btn" src={ shareIcon } alt="" />
        <span role="status">{ t(copied ? 'actions.copied' : 'actions.share') }</span>
      </button>
      <button
        type="button"
        className="button-ghost"
        aria-pressed={ favorite }
        onClick={ () => setFavorite(toggleFavorite(recipe)) }
      >
        <img
          data-testid="favorite-btn"
          src={ favorite ? blackHeartIcon : whiteHeartIcon }
          alt=""
        />
        { t(favorite ? 'actions.favorited' : 'actions.favorite') }
      </button>
    </div>
  );
}

RecipeActions.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    apiType: PropTypes.string,
  }).isRequired,
};

export default RecipeActions;
