import { t } from '../../i18n';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import FiltersContext from '../../context/FiltersContext';
import RecipesContext from '../../context/RecipesContext';
import fetchRecipe from '../../services/api';
import { KINDS } from '../../services/recipes';

const RECIPE_NUM = 12;

function FilterByCategory({ apiType, originalData }) {
  const { key } = KINDS[apiType];
  const [filters] = useContext(FiltersContext);
  const { setFetchedRecipes } = useContext(RecipesContext);
  const [active, setActive] = useState('');
  const categories = (filters.categories[key] || []).map((e) => e.strCategory);

  const select = async (category) => {
    // Clicking the active chip again (or "Todas") goes back to the full list.
    if (!category || category === active) {
      setFetchedRecipes(originalData);
      setActive('');
      return;
    }
    setActive(category);
    const response = await fetchRecipe(apiType, 'category', category);
    setFetchedRecipes(((response && response[key]) || []).slice(0, RECIPE_NUM));
  };

  return (
    <div className="chips" aria-label={ t('filter.categories') }>
      <button
        type="button"
        data-testid="All-category-filter"
        aria-pressed={ active === '' }
        onClick={ () => select('') }
      >
        { t('filter.all') }
      </button>
      { categories.map((category) => (
        <button
          key={ category }
          type="button"
          data-testid={ `${category}-category-filter` }
          aria-pressed={ active === category }
          onClick={ () => select(category) }
        >
          { category }
        </button>
      )) }
    </div>
  );
}

FilterByCategory.propTypes = {
  apiType: PropTypes.string.isRequired,
  originalData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FilterByCategory;
