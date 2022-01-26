import React, { useContext, useEffect } from 'react';
import APIContext from '../context/APIContext';
import '../styles/table.css';

const comparisonHandlers = {
  'maior que': (a, b) => a > b,
  'menor que': (a, b) => a < b,
  'igual a': (a, b) => a === b,
};

export default function Table() {
  const {
    fetchAPI,
    data,
    isLoading,
    filters,
    removeFilter,
  } = useContext(APIContext);

  useEffect(() => {
    fetchAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cols = ['Name', 'Rotation Period', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  // const planets = filter ? filteredData : data;
  const dataKeys = data[0]
    ? Object.keys(data[0]).filter((k) => k !== 'residents') : [];

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="table-container">
      <div className="filters">
        {
          filters.byNumericValues.map(({ column, comparison, value }, i) => (
            <div key={ `filter-${i}` } data-testid="filter">
              <span>{ `${column} ${comparison} ${value}` }</span>
              <button type="button" onClick={ () => removeFilter(i) }>X</button>
            </div>
          ))
        }
      </div>
      <table className="table table-dark text-center">
        <thead>
          <tr>
            {cols.map((col, i) => <th key={ `col${i}` } scope="col">{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            data
              .filter((planet) => (
                filters.byNumericValues.every(({ column, comparison, value }) => (
                  comparisonHandlers[comparison](Number(planet[column]), Number(value))
                ))))
              .filter((planet) => planet.name.includes(filters.byName))
              .map((planet, i) => (
                <tr key={ `row-${i}` }>
                  {dataKeys.map((k, kI) => ((k === 'name') ? (
                    <td
                      data-testid="planet-name"
                      key={ `cell-${k}-${kI}` }
                    >
                      {planet[k]}
                    </td>
                  ) : (
                    <td key={ `cell-${k}-${kI}` }>{planet[k]}</td>
                  )))}
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}
