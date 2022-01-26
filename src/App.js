import React from 'react';
import APIProvider from './context/APIProvider';
import Filters from './components/Filters';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <APIProvider>
      <h1 className="text-center m-3">StarWars Planets Search</h1>
      <Filters />
      <Table />
    </APIProvider>
  );
}

export default App;
