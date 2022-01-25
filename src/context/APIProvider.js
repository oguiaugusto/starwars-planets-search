import React, { useState } from 'react';
import PropTypes from 'prop-types';
import fetchPlanets from '../services/StarwarsAPI';
import APIContext from './APIContext';

export default function APIProvider({ children }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchAPI = async () => {
    setIsLoading(true);
    fetchPlanets()
      .then((r) => { setIsLoading(false); setData(r.results); })
      .catch((err) => { setIsLoading(false); setError(err.detail); });
  };

  const contextValue = { fetchAPI, data, error, isLoading };

  return (
    <APIContext.Provider value={ contextValue }>
      {children}
    </APIContext.Provider>
  );
}

APIProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};
