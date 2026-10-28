import { t } from '../../i18n';
import React, { useContext, useEffect, useState } from 'react';
import Page from '../Page';
import FilterByOrigin from '../Filter/FilterByOrigin';
import RecipesContext from '../../context/RecipesContext';
import Card from '../Card';
import { fetchDefaultList } from '../../services/recipes';

const apiType = 'meal';

function ExploreByOrigin() {
  const { fetchedRecipes, setFetchedRecipes } = useContext(RecipesContext);
  const [isLoading, setIsLoading] = useState(true);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    fetchDefaultList(apiType).then((list) => {
      setFetchedRecipes(list);
      setOriginalData(list);
    }).finally(() => setIsLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page title={ t('explore.byCuisine') } apiType={ apiType }>
      <FilterByOrigin apiType={ apiType } originalData={ originalData } />
      { isLoading ? <p className="status">{ t('list.loading') }</p> : (
        <section className="recipe-grid">
          { (fetchedRecipes || []).map((recipe, index) => (
            <Card key={ recipe.idMeal } recipe={ recipe } apiType={ apiType } index={ index } />
          )) }
        </section>
      ) }
    </Page>
  );
}

export default ExploreByOrigin;
