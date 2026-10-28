import React from 'react';
import './App.css';
import movies from './data';
import Header from './components/Header';
import MovieList from './components/MovieList';
import ProjectBar from './components/ProjectBar';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <MovieList movies={ movies } />
      </main>
      <ProjectBar />
    </div>
  );
}

export default App;
