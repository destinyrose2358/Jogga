import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../App.css';
import AuthRoute from '../util/route_util';
import Register from './Register';
import Login from './Login';
import Nav from './Nav';
import Landing from './Landing';
import {} from '../stylesheets/reset.scss';
import UploadImage from './UploadImage';
import CompleteUser from './CompleteUser'
import Dashboard from './Dashboard';

const App = () => (
  <div>
    <Nav />
    <h1>Auth Services Yo</h1>
    <Switch>
      <AuthRoute path='/onboarding' component={CompleteUser} routeType="protected" />
      <AuthRoute path='/register' component={Register} routeType='auth' />
      <AuthRoute path='/login' component={Login} routeType='auth' />
      <AuthRoute path='/upload' component={UploadImage} routeType="protected"/>
      <AuthRoute path='/dashboard' component={Dashboard} routeType='protected' />
      <AuthRoute path='/' component={Landing} routeType='auth' />
      <Redirect to='/' />
    </Switch>
  </div>
);

export default App;
