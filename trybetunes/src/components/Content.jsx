import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import NotFound from '../pages/NotFound';

export default class Content extends Component {
  render() {
    return (
      <main className="content">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          {/* Editing happens on the profile page itself. */}
          <Redirect exact from="/profile/edit" to="/profile" />
          <Route exact path="*" component={ NotFound } />
        </Switch>
      </main>
    );
  }
}
