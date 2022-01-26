import React, { useContext } from 'react';
import APIContext from '../../context/APIContext';
import Numeric from './Numeric';
import Order from './Order';
import '../../styles/filters.css';

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
    <div className="filters d-flex flex-column align-items-center">
      <div className="filter-name m-2">
        <input
          data-testid="name-filter"
          className="form-control"
          type="text"
          placeholder="Filter by name"
          value={ filters.byName }
          onChange={ handleByName }
        />
      </div>
      <div className="filter-planets d-flex align-items-center m-4">
        <Numeric
          columnFilters={ columnFilters }
          numericFilter={ numericFilter }
          handleNumericFilter={ handleNumericFilter }
          handleFilterData={ handleFilterData }
        />
        <Order
          columnFilters={ columnFilters }
          order={ order }
          handleOrder={ handleOrder }
          handleOrderBtn={ handleOrderBtn }
        />
      </div>
    </div>
  );
}
