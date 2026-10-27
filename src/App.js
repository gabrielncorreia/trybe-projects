import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './components/Header';
import Content from './components/Content';
import './index.css';

class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Header />
          <Content />
        </div>
      </HashRouter>
    );
  }
}

export default App;
