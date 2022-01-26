import React from 'react';
import PropTypes from 'prop-types';

export default function Numeric({
  columnFilters, numericFilter, handleNumericFilter, handleFilterData,
}) {
  return (
    <div className="filter-numeric">
      <select
        data-testid="column-filter"
        className="form-select"
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
        className="comparison form-select"
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
        className="form-control"
        type="number"
        name="value"
        value={ numericFilter.value }
        onChange={ handleNumericFilter }
      />
      <button
        data-testid="button-filter"
        className="btn btn-primary"
        type="button"
        onClick={ handleFilterData }
      >
        Filter
      </button>
    </div>
  );
}

Numeric.propTypes = {
  columnFilters: PropTypes.arrayOf(PropTypes.any).isRequired,
  numericFilter: PropTypes.objectOf(PropTypes.any).isRequired,
  handleNumericFilter: PropTypes.func.isRequired,
  handleFilterData: PropTypes.func.isRequired,
};
