import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Page from '../Page';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import {
  copyLink, getDone, getFavorites, removeFavorite,
} from '../../services/recipes';

const FILTERS = [
  { value: 'all', label: 'Todas', testid: 'filter-by-all-btn' },
  { value: 'comida', label: 'Comidas', testid: 'filter-by-food-btn' },
  { value: 'bebida', label: 'Bebidas', testid: 'filter-by-drink-btn' },
];

const toPath = (recipe) => `/${recipe.type === 'bebida' ? 'bebidas' : 'comidas'}/${recipe.id}`;

// Lists done recipes or favorites (both live in localStorage with the same shape).
function SavedRecipes({ kind }) {
  const isDone = kind === 'done';
  const [items, setItems] = useState(() => (isDone ? getDone() : getFavorites()));
  const [filter, setFilter] = useState('all');
  const [copiedId, setCopiedId] = useState('');
  const shown = items.filter((item) => filter === 'all' || item.type === filter);

  const share = async (recipe) => {
    const link = `${window.location.href.split('#')[0]}#${toPath(recipe)}`;
    if (await copyLink(link)) setCopiedId(recipe.id);
  };

  const unfavorite = (id) => {
    removeFavorite(id);
    setItems((current) => current.filter((item) => item.id !== id));
  };

  return (
    <Page title={ isDone ? 'Receitas feitas' : 'Receitas favoritas' }>
      <div className="chips">
        { FILTERS.map(({ value, label, testid }) => (
          <button
            key={ value }
            type="button"
            data-testid={ testid }
            aria-pressed={ filter === value }
            onClick={ () => setFilter(value) }
          >
            { label }
          </button>
        )) }
      </div>

      { shown.length === 0 && (
        <div className="empty">
          <p>{ isDone ? 'Nenhuma receita feita ainda.' : 'Nenhuma receita favorita ainda.' }</p>
          <p className="muted">
            { isDone
              ? 'Ao finalizar uma receita, ela aparece aqui.'
              : 'Toque em Favoritar em qualquer receita para guardá-la aqui.' }
            { ' ' }
            <Link to="/comidas">Ver receitas</Link>
          </p>
        </div>
      ) }

      <ul className="saved-list">
        { shown.map((recipe, index) => (
          <li key={ recipe.id } className="saved-card" data-testid={ `${index}-recipe-card` }>
            <Link to={ toPath(recipe) }>
              <img data-testid={ `${index}-horizontal-image` } src={ `${recipe.image}/preview` } alt="" />
            </Link>
            <div className="saved-info">
              <p className="muted small" data-testid={ `${index}-horizontal-top-text` }>
                { recipe.type === 'bebida'
                  ? recipe.alcoholicOrNot
                  : [recipe.area, recipe.category].filter(Boolean).join(', ') }
              </p>
              <Link to={ toPath(recipe) } className="saved-name" data-testid={ `${index}-horizontal-name` }>
                { recipe.name }
              </Link>
              { isDone && (
                <p className="muted small" data-testid={ `${index}-horizontal-done-date` }>
                  { `Feita em ${recipe.doneDate}` }
                </p>
              ) }
              { isDone && Array.isArray(recipe.tags) && recipe.tags.length > 0 && (
                <p className="tags">
                  { recipe.tags.slice(0, 2).map((tag) => (
                    <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>{ tag }</span>
                  )) }
                </p>
              ) }
            </div>
            <div className="saved-actions">
              <button type="button" className="icon-button" aria-label={ `Copiar link de ${recipe.name}` } onClick={ () => share(recipe) }>
                <img src={ shareIcon } alt="" data-testid={ `${index}-horizontal-share-btn` } />
              </button>
              { !isDone && (
                <button type="button" className="icon-button" aria-label={ `Remover ${recipe.name} das favoritas` } onClick={ () => unfavorite(recipe.id) }>
                  <img src={ blackHeartIcon } alt="" data-testid={ `${index}-horizontal-favorite-btn` } />
                </button>
              ) }
            </div>
            { copiedId === recipe.id && <p className="copied small" role="status">Link copiado!</p> }
          </li>
        )) }
      </ul>
    </Page>
  );
}

SavedRecipes.propTypes = {
  kind: PropTypes.oneOf(['done', 'favorites']).isRequired,
};

export default SavedRecipes;
