import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../../context/RecipesContext';
import fetchRecipe from '../../services/api';
import { KINDS } from '../../services/recipes';

const MODES = [
  { id: 'name', label: 'Nome', testid: 'name-search-radio' },
  { id: 'ingredient', label: 'Ingrediente', testid: 'ingredient-search-radio' },
  { id: 'letter', label: 'Primeira letra', testid: 'first-letter-search-radio' },
];

function SearchBar({ apiType }) {
  const [searchInput, setSearchInput] = useState('');
  const [mode, setMode] = useState('name');
  const [message, setMessage] = useState('');
  const { setFetchedRecipes } = useContext(RecipesContext);
  const history = useHistory();
  const { key, path, field } = KINDS[apiType];

  const handleSubmit = async (event) => {
    event.preventDefault();
    const term = searchInput.trim();
    if (!term) return;
    if (mode === 'letter' && term.length !== 1) {
      setMessage('Na busca por primeira letra, use só uma letra.');
      return;
    }
    const recipes = await fetchRecipe(apiType, mode, term);
    const list = recipes && recipes[key];
    if (!list) {
      setMessage(`Nenhuma receita encontrada para "${term}".`);
    } else if (list.length === 1) {
      history.push(`/${path}/${list[0][`id${field}`]}`);
    } else {
      setMessage('');
      setFetchedRecipes(list.slice(0, 12));
    }
  };

  return (
    <form className="searchbar" onSubmit={ handleSubmit } role="search">
      <div className="searchbar-row">
        <label htmlFor="search-input" className="visually-hidden">Buscar</label>
        <input
          id="search-input"
          type="search"
          name="barra"
          data-testid="search-input"
          placeholder={ mode === 'ingredient' ? 'Ex.: chicken' : 'O que você quer preparar?' }
          maxLength={ mode === 'letter' ? 1 : undefined }
          value={ searchInput }
          onChange={ ({ target }) => setSearchInput(target.value) }
        />
        <button type="submit" className="button-primary" data-testid="exec-search-btn">
          Buscar
        </button>
      </div>
      <div className="segmented" role="radiogroup" aria-label="Buscar por">
        { MODES.map(({ id, label, testid }) => (
          <label key={ id } htmlFor={ id } data-testid={ testid }>
            <input
              type="radio"
              name="selection"
              id={ id }
              checked={ mode === id }
              onChange={ () => { setMode(id); setMessage(''); } }
            />
            <span>{ label }</span>
          </label>
        )) }
      </div>
      { message && <p className="search-message" role="status">{ message }</p> }
    </form>
  );
}

SearchBar.propTypes = {
  apiType: PropTypes.string.isRequired,
};

export default SearchBar;
