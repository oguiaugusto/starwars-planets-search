import React, { useContext, useEffect } from 'react';
import APIContext from '../context/APIContext';

export default function Table() {
  const {
    fetchAPI,
    data,
    isLoading,
    filters,
    filter,
    filteredData,
  } = useContext(APIContext);

  useEffect(() => {
    fetchAPI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cols = ['Name', 'Rotation Period', 'Orbital Period',
    'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water',
    'Population', 'Films', 'Created', 'Edited', 'URL'];

  const planets = filter ? filteredData : data;
  const dataKeys = planets[0]
    ? Object.keys(planets[0]).filter((k) => k !== 'residents') : [];

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <table>
        <thead>
          <tr>
            {cols.map((col, i) => <th key={ `col${i}` } scope="col">{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {
            planets
              .filter((planet) => planet.name.includes(filters.byName))
              .map((planet, i) => (
                <tr key={ `row-${i}` }>
                  {dataKeys.map((k, kI) => (
                    <td key={ `cell-${k}-${kI}` }>{planet[k]}</td>
                  ))}
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  );
}
