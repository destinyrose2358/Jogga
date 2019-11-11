import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import '../App.css';
import AuthRoute from '../util/route_util';
import Register from './Register';
import Login from './Login';
import Nav from './Nav';
import Landing from './Landing';
import ResetStylesheet from '../stylesheets/reset.scss';

const App = () => (
  <div>
    <Nav />
    <h1>Auth Services Yo</h1>
    <Switch>
      <AuthRoute path='/register' component={Register} routeType='auth' />
      <AuthRoute path='/login' component={Login} routeType='auth' />
      <AuthRoute path='/' component={Landing} routeType='auth' />
      <Redirect to='/' />
    </Switch>
  </div>
);

export default App;
