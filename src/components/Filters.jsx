import React, { useContext } from 'react';
import APIContext from '../context/APIContext';

export default function Filters() {
  const { filters, handleByName } = useContext(APIContext);

  return (
    <div className="filters">
      <input
        data-testid="name-filter"
        type="text"
        value={ filters.byName }
        onChange={ handleByName }
      />
    </div>
  );
}
