import React, { useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/StarwarsAPI';
import APIContext from './APIContext';

export default function APIProvider({ children }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    byName: '',
  });

  const fetchAPI = async () => {
    setIsLoading(true);
    fetchPlanets()
      .then((r) => { setIsLoading(false); setData(r.results); })
      .catch((err) => { setIsLoading(false); setError(err.detail); });
  };

  const handleByName = ({ target: { value } }) => {
    setFilters({ ...filters, byName: value });
  };

  const contextValue = { fetchAPI, data, error, isLoading, filters, handleByName };

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
