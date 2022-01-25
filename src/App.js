import React from 'react';
import APIProvider from './context/APIProvider';
import Filters from './components/Filters';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <APIProvider>
      <Filters />
      <Table />
    </APIProvider>
  );
}

export default App;
