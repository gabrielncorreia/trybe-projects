import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { useLanguage } from './i18n';

function Root() {
  const language = useLanguage();
  return <App key={ language } />;
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root'),
);
