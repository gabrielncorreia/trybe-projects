import React from 'react';
import './App.css';
import Provider from './context/Provider';
import Header from './components/Header';
import Filter from './components/Filter';
import Table from './components/Table';
import ProjectBar from './components/ProjectBar';

function App() {
  return (
    <Provider>
      <main className="app">
        <Header />
        <Filter />
        <Table />
      </main>
      <ProjectBar />
    </Provider>
  );
}

export default App;
