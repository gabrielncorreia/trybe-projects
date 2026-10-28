import { t } from '../../i18n';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Page from '../Page';
import RecipeActions from '../RecipeActions';
import { recipeSubtitle } from '../Details';
import {
  apiTypeFromPath, fetchRecipeById, getChecked, KINDS, markDone, saveChecked,
} from '../../services/recipes';

export default function RecipeInProgress({ match: { url, params: { id } } }) {
  const apiType = apiTypeFromPath(url);
  const { path } = KINDS[apiType];
  const history = useHistory();
  const [recipe, setRecipe] = useState(null);
  const [checked, setChecked] = useState(() => getChecked(apiType, id));

  useEffect(() => {
    fetchRecipeById(apiType, id).then(setRecipe);
  }, [apiType, id]);

  const toggle = (name) => {
    setChecked((current) => {
      const next = current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name];
      saveChecked(apiType, id, next);
      return next;
    });
  };

  if (!recipe) {
    return (
      <Page apiType={ apiType } footer={ false }>
        <p className="status">{ t('details.loading') }</p>
      </Page>
    );
  }

  const total = recipe.ingredients.length;
  const doneCount = recipe.ingredients.filter(({ name }) => checked.includes(name)).length;
  const allDone = doneCount === total;

  return (
    <Page apiType={ apiType } footer={ false }>
      <article className="recipe cooking">
        <div className="recipe-hero">
          <img data-testid="recipe-photo" src={ recipe.image } alt="" />
        </div>
        <div className="recipe-body">
          <Link to={ `/${path}/${id}` } className="back-link">{ t('progress.back') }</Link>
          <h1 data-testid="recipe-title">{ recipe.name }</h1>
          <p className="muted" data-testid="recipe-category">{ recipeSubtitle(recipe) }</p>
          <RecipeActions recipe={ recipe } />

          <section>
            <div className="section-head">
              <h2>{ t('progress.ingredients') }</h2>
              <p className="muted small">{ t('progress.count', { done: doneCount, total }) }</p>
            </div>
            <div className="progress" aria-hidden="true">
              <span style={ { transform: `scaleX(${total ? doneCount / total : 0})` } } />
            </div>
            <ul className="checklist">
              { recipe.ingredients.map(({ name, measure }, i) => (
                <li key={ `${name}-${i}` }>
                  <label htmlFor={ `ingredient${i}` } data-testid={ `${i}-ingredient-step` }>
                    <input
                      type="checkbox"
                      id={ `ingredient${i}` }
                      checked={ checked.includes(name) }
                      onChange={ () => toggle(name) }
                    />
                    <span>{ name }</span>
                    <span className="muted">{ measure }</span>
                  </label>
                </li>
              )) }
            </ul>
          </section>

          <section>
            <h2>{ t('details.steps') }</h2>
            <div className="instructions" data-testid="instructions">
              { recipe.instructions.split(/\r?\n/).filter((line) => line.trim())
                .map((line, i) => <p key={ i }>{ line }</p>) }
            </div>
          </section>
        </div>
      </article>

      <div className="sticky-cta">
        { !allDone && <p className="muted small">{ t('progress.hint') }</p> }
        <button
          type="button"
          className="button-primary"
          data-testid="finish-recipe-btn"
          disabled={ !allDone }
          onClick={ () => {
            markDone(recipe);
            history.push('/receitas-feitas');
          } }
        >
          { t('progress.finish') }
        </button>
      </div>
    </Page>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
