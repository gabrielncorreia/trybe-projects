import { t } from '../../i18n';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../../context/RecipesContext';
import { fetchDefaultList, KINDS } from '../../services/recipes';
import Page from '../Page';
import Card from '../Card';
import FilterByCategory from '../Filter/FilterByCategory';

// Main list for /comidas and /bebidas.
function RecipeList({ apiType }) {
  const {
    fetchedRecipes, setFetchedRecipes, ingredientsFetch, setIngredientsFetch,
  } = useContext(RecipesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchDefaultList(apiType).then((list) => {
      setOriginalData(list);
      // Coming from "explore by ingredient", the filtered list is already in context.
      if (!ingredientsFetch) setFetchedRecipes(list);
    }).finally(() => setIsLoading(false));
    return () => setIngredientsFetch(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiType]);

  return (
    <Page title={ t(`kinds.${apiType}`) } apiType={ apiType } search>
      <FilterByCategory apiType={ apiType } originalData={ originalData } />
      { isLoading && <p className="status">{ t('list.loading') }</p> }
      { !isLoading && (
        <section className="recipe-grid">
          { (fetchedRecipes || []).map((recipe, index) => (
            <Card
              key={ recipe[`id${KINDS[apiType].field}`] }
              recipe={ recipe }
              apiType={ apiType }
              index={ index }
            />
          )) }
        </section>
      ) }
    </Page>
  );
}

RecipeList.propTypes = {
  apiType: PropTypes.oneOf(['meal', 'cocktail']).isRequired,
};

export default RecipeList;
