/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import AdministratorRegister from 'components/administratorRegister';
import Login from 'components/login';
import Hello from 'components/welcome';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/reg" component={AdministratorRegister} />

        <Redirect from="/reg" to="/login/" />
        <Route exact path="/login/" component={Login} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
