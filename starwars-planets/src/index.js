import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { useLanguage } from './i18n';

function Root() {
  const language = useLanguage();
  return <App key={ language } />;
}

ReactDOM.render(<Root />, document.getElementById('root'));
