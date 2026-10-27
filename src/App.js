import React from 'react';
import './App.css';
import { Redirect, Route, Switch } from 'react-router';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Trivia from './pages/Trivia';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/jogo" component={ Trivia } />
      {/* Game options now live on the start screen. */}
      <Redirect exact from="/config" to="/" />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="*" component={ NotFound } />
    </Switch>
  );
}
