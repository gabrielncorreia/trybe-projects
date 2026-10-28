import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import store from './store/index';
import { useLanguage } from './i18n';
import * as serviceWorker from './serviceWorker';

// Remounts the app on a language change; the Redux store sits outside, so expenses survive.
function Root() {
  const language = useLanguage();
  return <App key={ language } />;
}

ReactDOM.render(
  <HashRouter>
    <Provider store={ store }>
      <Root />
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
