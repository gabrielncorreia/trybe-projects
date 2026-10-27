import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import login from './pages/Login';
import carteira from './pages/Wallet';

export default class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ login } />
          <Route exact path="/carteira" component={ carteira } />
        </Switch>
      </div>
    );
  }
}
