import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import LABELS from './labels';

const COLUMNS = Object.keys(LABELS);
const NUMERIC = ['rotation_period', 'orbital_period', 'diameter', 'surface_water', 'population', 'films'];

// Planet swatch tinted by its climate and terrain, and sized by its diameter.
const PALETTE = [
  [/gas giant/, '#d8a46c'],
  [/frozen|ice|tundra/, '#cfe3f2'],
  [/arid|desert|rock|barren/, '#d9a25f'],
  [/murky|swamp|bog/, '#7c8a4a'],
  [/tropical|jungle|rainforest/, '#3f9b62'],
  [/hot|superheated|lava|polluted/, '#d0573f'],
  [/ocean|water/, '#3d84c4'],
  [/temperate|grass|forest/, '#5aab86'],
];

function planetStyle({ climate, terrain, diameter }) {
  const text = `${climate} ${terrain}`;
  const match = PALETTE.find(([pattern]) => pattern.test(text));
  const km = Number(diameter);
  const size = km > 0 ? Math.round(8 + Math.log10(km) * 3.4) : 14;
  return { '--planet': match ? match[1] : '#6b7390', width: size, height: size };
}

function renderCell(planet, column) {
  if (column === 'films') return planet.films.length;
  if (column === 'created' || column === 'edited') return planet[column].slice(0, 10);
  if (column === 'url') {
    return <a href={ planet.url } target="_blank" rel="noopener noreferrer">API</a>;
  }
  return planet[column];
}

export default function Table() {
  const { planets, loading, error, clearFilters, setName } = useContext(AppContext);

  if (error) {
    return <p className="state">Não foi possível carregar os planetas. Recarregue a página para tentar de novo.</p>;
  }

  return (
    <section className="panel table-panel">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              { COLUMNS.map((column) => (
                <th key={ column } scope="col" className={ NUMERIC.includes(column) ? 'num' : '' }>
                  { LABELS[column] }
                </th>
              )) }
            </tr>
          </thead>
          <tbody>
            { planets.map((planet) => (
              <tr key={ planet.name }>
                <th scope="row" className="planet">
                  <span className="planet-label">
                    <span className="swatch" style={ planetStyle(planet) } aria-hidden="true" />
                    <span data-testid="planet-name">{planet.name}</span>
                  </span>
                </th>
                { COLUMNS.slice(1).map((column) => (
                  <td key={ column } className={ NUMERIC.includes(column) ? 'num' : '' }>
                    { renderCell(planet, column) }
                  </td>
                )) }
              </tr>
            )) }
          </tbody>
        </table>
      </div>
      { loading && <p className="state">Carregando planetas...</p> }
      { !loading && planets.length === 0 && (
        <div className="state">
          <p>Nenhum planeta atende a esses filtros.</p>
          <button
            type="button"
            className="link-button"
            onClick={ () => { clearFilters(); setName(''); } }
          >
            Limpar busca e filtros
          </button>
        </div>
      ) }
    </section>
  );
}
