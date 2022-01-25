import React, { useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/StarwarsAPI';
import APIContext from './APIContext';

export default function APIProvider({ children }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState(false);
  const [filters, setFilters] = useState({
    byName: '',
    byNumericValues: [],
  });
  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const [filteredData, setFilteredData] = useState([]);

  const fetchAPI = async () => {
    setIsLoading(true);
    fetchPlanets()
      .then((r) => { setIsLoading(false); setData(r.results); })
      .catch((err) => { setIsLoading(false); setError(err.detail); });
  };

  const comparisonHandlers = {
    'maior que': (a, b) => a > b,
    'menor que': (a, b) => a < b,
    'igual a': (a, b) => a === b,
  };

  const handleByName = ({ target: { value } }) => {
    setFilters({ ...filters, byName: value });
  };

  const handleNumericFilter = ({ target: { name, value } }) => {
    setNumericFilter({ ...numericFilter, [name]: value });
  };

  const handleFilterData = () => {
    const { column, comparison } = numericFilter;
    let { value = 0 } = numericFilter;
    if (value === '') value = 0;

    const newData = data.filter((planet) => (
      comparisonHandlers[comparison](Number(planet[column]), Number(value))
    ));

    setFilters({
      ...filters,
      byNumericValues: [...filters.byNumericValues, { column, comparison, value }],
    });
    setFilteredData(newData);
    setFilter(true);
  };

  const contextValue = {
    fetchAPI,
    data,
    error,
    isLoading,
    filters,
    numericFilter,
    handleByName,
    handleNumericFilter,
    handleFilterData,
    filteredData,
    filter,
  };

  return (
    <APIContext.Provider value={ contextValue }>
      {children}
    </APIContext.Provider>
  );
}

APIProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.arrayOf(PropTypes.any),
  ]).isRequired,
};
