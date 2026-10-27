import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { NUMERIC_COLUMNS } from '../context/Provider';
import LABELS from './labels';

const COMPARISONS = ['maior que', 'menor que', 'igual a'];
const SYMBOL = { 'maior que': '>', 'menor que': '<', 'igual a': '=' };

export default function Filter() {
  const {
    filters, addFilter, removeFilter, clearFilters, availableColumns, order, setOrder,
  } = useContext(AppContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [sortColumn, setSortColumn] = useState('population');
  const [sortDirection, setSortDirection] = useState('ASC');

  // A column can only be filtered once: move off one that was just used.
  useEffect(() => {
    if (!availableColumns.includes(column)) setColumn(availableColumns[0] || '');
  }, [availableColumns, column]);

  const handleFilter = (event) => {
    event.preventDefault();
    if (!column) return;
    addFilter({ column, comparison, value });
  };

  return (
    <section className="controls" aria-label="Filtros e ordenação">
      <form className="panel" onSubmit={ handleFilter }>
        <h2>Filtrar por número</h2>
        <div className="row">
          <label htmlFor="column-filter" className="field">
            Coluna
            <select
              id="column-filter"
              data-testid="column-filter"
              value={ column }
              disabled={ !availableColumns.length }
              onChange={ ({ target }) => setColumn(target.value) }
            >
              { availableColumns.map((key) => (
                <option key={ key } value={ key } label={ LABELS[key] }>{key}</option>
              )) }
            </select>
          </label>
          <label htmlFor="comparison-filter" className="field">
            Condição
            <select
              id="comparison-filter"
              data-testid="comparison-filter"
              value={ comparison }
              onChange={ ({ target }) => setComparison(target.value) }
            >
              { COMPARISONS.map((option) => (
                <option key={ option } value={ option }>{option}</option>
              )) }
            </select>
          </label>
          <label htmlFor="value-filter" className="field">
            Valor
            <input
              id="value-filter"
              type="number"
              value={ value }
              data-testid="value-filter"
              onChange={ ({ target }) => setValue(target.value) }
            />
          </label>
          <button
            type="submit"
            className="button-primary"
            data-testid="button-filter"
            disabled={ !availableColumns.length }
          >
            Filtrar
          </button>
        </div>

        { filters.length > 0 && (
          <div className="chips">
            { filters.map((filter) => (
              <span key={ filter.column } className="chip" data-testid="filter">
                { `${LABELS[filter.column]} ${SYMBOL[filter.comparison]} ${filter.value}` }
                <button
                  type="button"
                  aria-label={ `Remover filtro de ${LABELS[filter.column]}` }
                  onClick={ () => removeFilter(filter.column) }
                >
                  ×
                </button>
              </span>
            )) }
            <button type="button" className="link-button" onClick={ clearFilters }>
              Limpar filtros
            </button>
          </div>
        ) }
      </form>

      <form
        className="panel"
        onSubmit={ (event) => {
          event.preventDefault();
          setOrder({ column: sortColumn, sort: sortDirection });
        } }
      >
        <h2>Ordenar</h2>
        <div className="row">
          <label htmlFor="column-sort" className="field">
            Coluna
            <select
              id="column-sort"
              data-testid="column-sort"
              value={ sortColumn }
              onChange={ ({ target }) => setSortColumn(target.value) }
            >
              { NUMERIC_COLUMNS.map((key) => (
                <option key={ key } value={ key } label={ LABELS[key] }>{key}</option>
              )) }
            </select>
          </label>
          <fieldset className="segmented">
            <legend className="visually-hidden">Direção</legend>
            <label htmlFor="sort-asc">
              <input
                type="radio"
                id="sort-asc"
                name="sort-direction"
                data-testid="column-sort-input-asc"
                checked={ sortDirection === 'ASC' }
                onChange={ () => setSortDirection('ASC') }
              />
              <span>Crescente</span>
            </label>
            <label htmlFor="sort-desc">
              <input
                type="radio"
                id="sort-desc"
                name="sort-direction"
                data-testid="column-sort-input-desc"
                checked={ sortDirection === 'DESC' }
                onChange={ () => setSortDirection('DESC') }
              />
              <span>Decrescente</span>
            </label>
          </fieldset>
          <button type="submit" className="button-secondary" data-testid="column-sort-button">
            Ordenar
          </button>
        </div>
        { order.column !== 'name' && (
          <div className="chips">
            <span className="chip chip-quiet">
              { `${LABELS[order.column]}, ${order.sort === 'ASC' ? 'crescente' : 'decrescente'}` }
            </span>
            <button
              type="button"
              className="link-button"
              onClick={ () => setOrder({ column: 'name', sort: 'ASC' }) }
            >
              Voltar à ordem alfabética
            </button>
          </div>
        ) }
      </form>
    </section>
  );
}
