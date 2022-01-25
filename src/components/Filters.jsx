import React, { useContext } from 'react';
import APIContext from '../context/APIContext';

export default function Filters() {
  const {
    filters,
    handleByName,
    handleByNumericValues,
    handleFilterData,
  } = useContext(APIContext);

  const columnFilters = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  return (
    <div className="filters">
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Filter by name"
        value={ filters.byName }
        onChange={ handleByName }
      />
      <div className="numeric-values">
        <select
          data-testid="column-filter"
          name="column"
          value={ filters.byNumericValues.column }
          onChange={ handleByNumericValues }
        >
          {
            columnFilters.map((c, i) => (
              <option key={ `option-${c}-${i}` } value={ c }>{c}</option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ filters.byNumericValues.comparison }
          onChange={ handleByNumericValues }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          value={ filters.byNumericValues.value }
          onChange={ handleByNumericValues }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handleFilterData }
        >
          Filter
        </button>
      </div>
    </div>
  );
}
