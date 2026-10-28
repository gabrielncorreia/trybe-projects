import { t } from '../../i18n';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProfileIcon from '../../images/profileIcon.svg';
import SearchIcon from '../../images/searchIcon.svg';
import RecipesContext from '../../context/RecipesContext';
import SearchBar from './SearchBar';

export default function Header({ name, search, apiType }) {
  const { renderBar, setRenderBar } = useContext(RecipesContext);

  return (
    <>
      <header className="topbar">
        <h1 data-testid="page-title">{ name }</h1>
        <div className="topbar-actions">
          { search && (
            <button
              type="button"
              className={ `icon-button${renderBar ? ' is-active' : ''}` }
              aria-expanded={ renderBar }
              aria-label={ t('header.search') }
              onClick={ () => setRenderBar((open) => !open) }
            >
              <img data-testid="search-top-btn" src={ SearchIcon } alt="" />
            </button>
          ) }
          <Link to="/perfil" className="icon-button" aria-label={ t('header.profile') }>
            <img data-testid="profile-top-btn" src={ ProfileIcon } alt="" />
          </Link>
        </div>
      </header>
      { search && renderBar && <SearchBar apiType={ apiType } /> }
    </>
  );
}

Header.propTypes = {
  apiType: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  search: PropTypes.bool.isRequired,
};
