import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

export default function Header() {
  const { name, setName, planets, total, loading } = useContext(AppContext);

  return (
    <header className="header">
      <p className="eyebrow">Arquivo galáctico</p>
      <h1>Planetas de Star Wars</h1>
      <p className="count" aria-live="polite">
        { loading ? 'Carregando planetas...' : `${planets.length} de ${total} planetas` }
      </p>
      <label htmlFor="name-filter" className="search">
        <span className="visually-hidden">Buscar planeta pelo nome</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          id="name-filter"
          type="search"
          placeholder="Buscar planeta pelo nome"
          value={ name }
          onChange={ ({ target }) => setName(target.value) }
          data-testid="name-filter"
        />
      </label>
    </header>
  );
}
