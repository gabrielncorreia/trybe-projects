import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';

// swapi-trybe.herokuapp.com is gone; swapi.info serves the same data as a plain array.
const url = 'https://swapi.info/api/planets';

export const NUMERIC_COLUMNS = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const COMPARE = {
  'maior que': (a, b) => a > b,
  'menor que': (a, b) => a < b,
  'igual a': (a, b) => a === b,
};

// "unknown" values become NaN: they fail every numeric filter and always sort last.
// Ties (including two unknowns) fall back to alphabetical order.
function sortPlanets(planets, { column, sort }) {
  const byName = (a, b) => a.name.localeCompare(b.name);
  if (column === 'name') return [...planets].sort(byName);
  const direction = sort === 'DESC' ? -1 : 1;
  return [...planets].sort((a, b) => {
    const x = Number(a[column]);
    const y = Number(b[column]);
    if (Number.isNaN(x) || Number.isNaN(y)) {
      return (Number.isNaN(x) - Number.isNaN(y)) || byName(a, b);
    }
    return ((x - y) * direction) || byName(a, b);
  });
}

export default function Provider({ children }) {
  const [allPlanets, setAllPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [filters, setFilters] = useState([]);
  const [order, setOrder] = useState({ column: 'name', sort: 'ASC' });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch(url).then((response) => response.json());
        setAllPlanets(Array.isArray(data) ? data : data.results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const search = name.trim().toLowerCase();
  const planets = sortPlanets(
    allPlanets
      .filter((planet) => planet.name.toLowerCase().includes(search))
      .filter((planet) => filters.every(({ column, comparison, value }) => (
        COMPARE[comparison](Number(planet[column]), Number(value))
      ))),
    order,
  );

  const contextValue = {
    planets,
    total: allPlanets.length,
    loading,
    error,
    name,
    setName,
    filters,
    addFilter: (filter) => setFilters((current) => [...current, filter]),
    removeFilter: (column) => setFilters((current) => current
      .filter((filter) => filter.column !== column)),
    clearFilters: () => setFilters([]),
    availableColumns: NUMERIC_COLUMNS
      .filter((column) => !filters.some((filter) => filter.column === column)),
    order,
    setOrder,
  };

  return (
    <AppContext.Provider value={ contextValue }>{children}</AppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
