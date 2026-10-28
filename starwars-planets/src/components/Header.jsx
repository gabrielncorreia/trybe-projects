import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import { t } from '../i18n';

export default function Header() {
  const { name, setName, planets, total, loading } = useContext(AppContext);

  return (
    <header className="header">
      <p className="eyebrow">{ t('header.eyebrow') }</p>
      <h1>{ t('header.title') }</h1>
      <p className="count" aria-live="polite">
        { loading
          ? t('header.loading')
          : t('header.count', { shown: planets.length, total }) }
      </p>
      <label htmlFor="name-filter" className="search">
        <span className="visually-hidden">{ t('header.search') }</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id="name-filter"
          type="search"
          placeholder={ t('header.search') }
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
          data-testid="name-filter"
        />
      </label>
    </header>
  );
}
