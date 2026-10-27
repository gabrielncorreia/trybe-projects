import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Page from '../Page';
import { fetchLists } from '../../services/api';
import { KINDS } from '../../services/recipes';
import IngredientCard from '../Card/IngredientCard';

const INGREDIENTS_NUM = 24;

function ExploreByIngredients({ apiType }) {
  const [ingredients, setIngredients] = useState(null);
  const { key } = KINDS[apiType];

  useEffect(() => {
    fetchLists(apiType, 'ingredients').then((response) => {
      setIngredients(((response && response[key]) || []).slice(0, INGREDIENTS_NUM));
    });
  }, [apiType, key]);

  return (
    <Page title="Por ingrediente" apiType={ apiType }>
      { !ingredients ? <p className="status">Carregando ingredientes...</p> : (
        <section className="ingredient-grid">
          { ingredients.map((ingredient, index) => (
            <IngredientCard
              key={ ingredient.strIngredient || ingredient.strIngredient1 }
              index={ index }
              apiType={ apiType }
              ingredient={ ingredient }
            />
          )) }
        </section>
      ) }
    </Page>
  );
}

ExploreByIngredients.propTypes = {
  apiType: PropTypes.string.isRequired,
};

export default ExploreByIngredients;
