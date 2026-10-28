import { t } from '../../i18n';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import FiltersContext from '../../context/FiltersContext';
import RecipesContext from '../../context/RecipesContext';
import fetchRecipe from '../../services/api';

function FilterByOrigin({ originalData, apiType }) {
  const { setFetchedRecipes } = useContext(RecipesContext);
  const [filters] = useContext(FiltersContext);
  const { areas } = filters;

  const handleChange = async ({ target: { value } }) => {
    if (value === 'All') {
      setFetchedRecipes(originalData);
      return;
    }
    const response = await fetchRecipe(apiType, 'origin', value);
    setFetchedRecipes(((response && response.meals) || []).slice(0, 12));
  };

  return (
    <label htmlFor="Origin" className="field origin-field">
      { t('filter.cuisine') }
      <select
        data-testid="explore-by-area-dropdown"
        name="Origin"
        id="Origin"
        disabled={ !areas.length }
        onChange={ handleChange }
      >
        <option data-testid="All-option" value="All">{ t('filter.all') }</option>
        { areas.map((area) => (
          <option data-testid={ `${area}-option` } key={ area } value={ area }>{ area }</option>
        )) }
      </select>
    </label>
  );
}

FilterByOrigin.propTypes = {
  apiType: PropTypes.string.isRequired,
  originalData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FilterByOrigin;
