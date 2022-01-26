import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/StarwarsAPI';
import APIContext from './APIContext';

const NEGATIVE_ONE = -1;

const INITIAL_COLUMNS = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

export default function APIProvider({ children }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [columnFilters, setColumnFilters] = useState(INITIAL_COLUMNS);
  const [filters, setFilters] = useState({
    byName: '',
    byNumericValues: [],
  });
  const [numericFilter, setNumericFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'asc',
  });

  const fetchAPI = async () => {
    setIsLoading(true);
    fetchPlanets()
      .then((r) => {
        setIsLoading(false);
        const sortedData = r.results.sort((a, b) => {
          if (a.name < b.name) return NEGATIVE_ONE;
          return (a.name > b.name) ? 1 : 0;
        });
        setData(sortedData);
      })
      .catch((err) => { setIsLoading(false); setError(err.detail); });
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

    setFilters({
      ...filters,
      byNumericValues: [...filters.byNumericValues, { column, comparison, value }],
    });
    setNumericFilter({ column: columnFilters[0], comparison: 'maior que', value: 0 });
  };

  const handleOrder = ({ target: { name, value } }) => {
    setOrder({ ...order, [name]: value });
  };

  const handleOrderBtn = () => {
    const { column, sort } = order;
    const newData = sort === 'asc' ? (
      [...data].sort((a, b) => Number(a[column]) - Number(b[column]))
    ) : (
      [...data]
        .sort((a, b) => Number(b[column]) - Number(a[column]))
    );
    setData(newData);
  };

  const removeFilter = (filterI) => {
    setFilters({
      ...filters,
      byNumericValues: filters.byNumericValues.filter((_f, i) => i !== filterI),
    });
  };

  const contextValue = {
    fetchAPI,
    data,
    error,
    isLoading,
    columnFilters,
    filters,
    numericFilter,
    order,
    handleByName,
    handleNumericFilter,
    handleFilterData,
    handleOrder,
    handleOrderBtn,
    removeFilter,
  };

  useEffect(() => {
    setColumnFilters(INITIAL_COLUMNS.filter((c) => (
      !filters.byNumericValues.some(({ column: col }) => col === c)
    )));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

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
