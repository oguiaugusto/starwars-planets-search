import React, { useContext } from 'react';
import APIContext from '../context/APIContext';

export default function Filters() {
  const {
    filters,
    columnFilters,
    numericFilter,
    order,
    handleByName,
    handleNumericFilter,
    handleFilterData,
    handleOrder,
    handleOrderBtn,
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
      <div className="order">
        <select
          data-testid="column-sort"
          name="column"
          value={ order.column }
          onChange={ handleOrder }
        >
          {
            columnFilters.map((c, i) => (
              <option key={ `option-${c}-${i}` } value={ c }>{c}</option>
            ))
          }
        </select>
        <div className="sort">
          <label htmlFor="asc">
            Ascending
            <input
              data-testid="column-sort-input-asc"
              type="radio"
              name="sort"
              id="asc"
              value="asc"
              checked={ order.sort === 'asc' }
              onChange={ handleOrder }
            />
          </label>
          <label htmlFor="desc">
            Descending
            <input
              data-testid="column-sort-input-desc"
              type="radio"
              name="sort"
              id="desc"
              value="desc"
              checked={ order.sort === 'desc' }
              onChange={ handleOrder }
            />
          </label>
          <button
            data-testid="column-sort-button"
            type="button"
            onClick={ handleOrderBtn }
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}
