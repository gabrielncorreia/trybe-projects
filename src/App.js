import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Header from './components/Header';
import Filter from './components/Filter';
import Table from './components/Table';

function App() {
  return (
    <Provider>
      <main className="app">
        <Header />
        <Filter />
        <Table />
      </main>
    </Provider>
  );
}

export default App;
