import React, { useContext } from 'react';
import APIContext from '../context/APIContext';

export default function Filters() {
  const {
    filters,
    columnFilters,
    handleByName,
    numericFilter,
    handleNumericFilter,
    handleFilterData,
  } = useContext(APIContext);

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
          value={ numericFilter.column }
          onChange={ handleNumericFilter }
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
          value={ numericFilter.comparison }
          onChange={ handleNumericFilter }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          name="value"
          value={ numericFilter.value }
          onChange={ handleNumericFilter }
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
