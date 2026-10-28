import { t } from '../../i18n';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Page from '../Page';
import RecipeActions from '../RecipeActions';
import {
  apiTypeFromPath, fetchDefaultList, fetchRecipeById, getChecked, getDone, KINDS, youtubeEmbed,
} from '../../services/recipes';

export const recipeSubtitle = (recipe) => (
  recipe.apiType === 'cocktail'
    ? [recipe.category, recipe.alcoholicOrNot]
    : [recipe.category, recipe.area]
).filter(Boolean).join(', ');

export default function Details({ match: { params: { id } }, location: { pathname } }) {
  const apiType = apiTypeFromPath(pathname);
  const otherType = apiType === 'meal' ? 'cocktail' : 'meal';
  const { path } = KINDS[apiType];
  const kind = t(`kinds.${apiType}Lower`);
  const [recipe, setRecipe] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setRecipe(null);
    setNotFound(false);
    fetchRecipeById(apiType, id).then((found) => {
      if (found) setRecipe(found);
      else setNotFound(true);
    });
    fetchDefaultList(otherType, 6).then(setRecommended);
  }, [apiType, otherType, id]);

  if (notFound) {
    return (
      <Page apiType={ apiType } footer={ false }>
        <div className="empty">
          <h1>{ t('details.notFound') }</h1>
          <Link to={ `/${path}` }>{ t('details.see', { kind }) }</Link>
        </div>
      </Page>
    );
  }

  if (!recipe) {
    return (
      <Page apiType={ apiType } footer={ false }>
        <p className="status">{ t('details.loading') }</p>
      </Page>
    );
  }

  const embed = youtubeEmbed(recipe.youtube);
  const started = getChecked(apiType, id).length > 0;
  const done = getDone().some((item) => item.id === id);
  const other = KINDS[otherType];
  let cta = t('details.start');
  if (started) cta = t('details.continue');
  else if (done) cta = t('details.again');

  return (
    <Page apiType={ apiType } footer={ false }>
      <article className="recipe">
        <div className="recipe-hero">
          <img data-testid="recipe-photo" src={ recipe.image } alt="" />
        </div>
        <div className="recipe-body">
          <Link to={ `/${path}` } className="back-link">{ t('details.back', { kind }) }</Link>
          <h1 data-testid="recipe-title">{ recipe.name }</h1>
          <p className="muted" data-testid="recipe-category">{ recipeSubtitle(recipe) }</p>
          <RecipeActions recipe={ recipe } />

          <section>
            <h2>{ t('details.ingredients', { count: recipe.ingredients.length }) }</h2>
            <ul className="ingredient-list">
              { recipe.ingredients.map(({ name, measure }, i) => (
                <li key={ `${name}-${i}` } data-testid={ `${i}-ingredient-name-and-measure` }>
                  <span>{ name }</span>
                  <span className="muted">{ measure }</span>
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

          { embed && (
            <section>
              <h2>{ t('details.video') }</h2>
              <div className="video">
                <iframe
                  data-testid="video"
                  src={ embed }
                  title={ t('details.videoTitle', { name: recipe.name }) }
                  loading="lazy"
                  allow="encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          ) }

          { recommended.length > 0 && (
            <section>
              <h2>{ t(apiType === 'meal' ? 'details.pairMeal' : 'details.pairDrink') }</h2>
              <div className="recommend-row">
                { recommended.map((item, i) => (
                  <Link
                    key={ item[`id${other.field}`] }
                    to={ `/${other.path}/${item[`id${other.field}`]}` }
                    className="recommend-card"
                    data-testid={ `${i}-recomendation-card` }
                  >
                    <img src={ `${item[`str${other.field}Thumb`]}/preview` } alt="" loading="lazy" />
                    <p data-testid={ `${i}-recomendation-title` }>{ item[`str${other.field}`] }</p>
                  </Link>
                )) }
              </div>
            </section>
          ) }
        </div>
      </article>

      <div className="sticky-cta">
        <Link to={ `/${path}/${id}/in-progress` } className="button-primary" data-testid="start-recipe-btn">
          { cta }
        </Link>
      </div>
    </Page>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
