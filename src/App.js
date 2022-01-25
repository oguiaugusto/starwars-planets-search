import React from 'react';
import APIProvider from './context/APIProvider';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <APIProvider>
      <Table />
    </APIProvider>
  );
}

export default App;
