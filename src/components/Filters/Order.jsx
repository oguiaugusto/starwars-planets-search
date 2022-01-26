import React from 'react';
import PropTypes from 'prop-types';

export default function Order({
  columnFilters, order, handleOrder, handleOrderBtn,
}) {
  return (
    <div className="order align-items-center">
      <select
        data-testid="column-sort"
        className="form-select g-col-6"
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
      <div className="sort form-check d-flex flex-column">
        <label htmlFor="asc">
          <input
            data-testid="column-sort-input-asc"
            className="form-check-input me-1 "
            type="radio"
            name="sort"
            id="asc"
            value="asc"
            checked={ order.sort === 'asc' }
            onChange={ handleOrder }
          />
          Ascending
        </label>
        <label htmlFor="desc">
          <input
            data-testid="column-sort-input-desc"
            className="form-check-input me-1"
            type="radio"
            name="sort"
            id="desc"
            value="desc"
            checked={ order.sort === 'desc' }
            onChange={ handleOrder }
          />
          Descending
        </label>
      </div>
      <button
        data-testid="column-sort-button"
        className="btn btn-success"
        type="button"
        onClick={ handleOrderBtn }
      >
        Order
      </button>
    </div>
  );
}

Order.propTypes = {
  columnFilters: PropTypes.arrayOf(PropTypes.any).isRequired,
  order: PropTypes.objectOf(PropTypes.any).isRequired,
  handleOrder: PropTypes.func.isRequired,
  handleOrderBtn: PropTypes.func.isRequired,
};
