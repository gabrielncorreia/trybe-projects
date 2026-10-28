import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import { NUMERIC_COLUMNS } from '../context/Provider';
import label from './labels';
import { t } from '../i18n';

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
    <section className="controls" aria-label={ t('filter.region') }>
      <form className="panel" onSubmit={ handleFilter }>
        <h2>{ t('filter.title') }</h2>
        <div className="row">
          <label htmlFor="column-filter" className="field">
            { t('filter.column') }
            <select
              id="column-filter"
              data-testid="column-filter"
              value={ column }
              disabled={ !availableColumns.length }
              onChange={ ({ target }) => setColumn(target.value) }
            >
              { availableColumns.map((key) => (
                <option key={ key } value={ key } label={ label(key) }>{key}</option>
              )) }
            </select>
          </label>
          <label htmlFor="comparison-filter" className="field">
            { t('filter.comparison') }
            <select
              id="comparison-filter"
              data-testid="comparison-filter"
              value={ comparison }
              onChange={ ({ target }) => setComparison(target.value) }
            >
              { COMPARISONS.map((option) => (
                <option key={ option } value={ option } label={ t(`filter.comparisons.${option}`) }>
                  {option}
                </option>
              )) }
            </select>
          </label>
          <label htmlFor="value-filter" className="field">
            { t('filter.value') }
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
            { t('filter.submit') }
          </button>
        </div>

        { filters.length > 0 && (
          <div className="chips">
            { filters.map((filter) => (
              <span key={ filter.column } className="chip" data-testid="filter">
                { `${label(filter.column)} ${SYMBOL[filter.comparison]} ${filter.value}` }
                <button
                  type="button"
                  aria-label={ t('filter.remove', { column: label(filter.column) }) }
                  onClick={ () => removeFilter(filter.column) }
                >
                  ×
                </button>
              </span>
            )) }
            <button type="button" className="link-button" onClick={ clearFilters }>
              { t('filter.clear') }
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
        <h2>{ t('sort.title') }</h2>
        <div className="row">
          <label htmlFor="column-sort" className="field">
            { t('sort.column') }
            <select
              id="column-sort"
              data-testid="column-sort"
              value={ sortColumn }
              onChange={ ({ target }) => setSortColumn(target.value) }
            >
              { NUMERIC_COLUMNS.map((key) => (
                <option key={ key } value={ key } label={ label(key) }>{key}</option>
              )) }
            </select>
          </label>
          <fieldset className="segmented">
            <legend className="visually-hidden">{ t('sort.direction') }</legend>
            <label htmlFor="sort-asc">
              <input
                type="radio"
                id="sort-asc"
                name="sort-direction"
                data-testid="column-sort-input-asc"
                checked={ sortDirection === 'ASC' }
                onChange={ () => setSortDirection('ASC') }
              />
              <span>{ t('sort.asc') }</span>
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
              <span>{ t('sort.desc') }</span>
            </label>
          </fieldset>
          <button type="submit" className="button-secondary" data-testid="column-sort-button">
            { t('sort.submit') }
          </button>
        </div>
        { order.column !== 'name' && (
          <div className="chips">
            <span className="chip chip-quiet">
              { t('sort.current', {
                column: label(order.column),
                direction: t(order.sort === 'ASC' ? 'sort.ascLower' : 'sort.descLower'),
              }) }
            </span>
            <button
              type="button"
              className="link-button"
              onClick={ () => setOrder({ column: 'name', sort: 'ASC' }) }
            >
              { t('sort.reset') }
            </button>
          </div>
        ) }
      </form>
    </section>
  );
}
