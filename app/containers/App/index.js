import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminLogin from 'components/AdminLogin';
import AdminRegister from 'components/AdminRegister';
import CreateUser from 'components/CreateUser';
import Users from 'components/users';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/" component={AdminLogin} />
        <Route exact path="/register" component={AdminRegister} />
        <Route exact path="/users/create" component={CreateUser} />
      </Switch>
    </div>
  );
}
