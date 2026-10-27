import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import fetchRecipe, { getIngredientImg } from '../../services/api';
import { KINDS } from '../../services/recipes';

function IngredientCard({ index, ingredient, apiType }) {
  const nameKey = apiType === 'cocktail' ? 'strIngredient1' : 'strIngredient';
  const name = ingredient[nameKey];
  const { key, path } = KINDS[apiType];
  const history = useHistory();
  const { setIngredientsFetch, setFetchedRecipes } = useContext(RecipesContext);

  // Show the recipes that use this ingredient on the main list page.
  const handleClick = async () => {
    const response = await fetchRecipe(apiType, 'ingredient', name);
    setFetchedRecipes(((response && response[key]) || []).slice(0, 12));
    setIngredientsFetch(true);
    history.push(`/${path}`);
  };

  return (
    <button
      data-testid={ `${index}-ingredient-card` }
      className="ingredient-card"
      type="button"
      onClick={ handleClick }
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ getIngredientImg(apiType, name) }
        alt=""
        loading="lazy"
      />
      <span data-testid={ `${index}-card-name` }>{ name }</span>
    </button>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number.isRequired,
  apiType: PropTypes.string.isRequired,
  ingredient: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IngredientCard;
