import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import '../App.css';
import AuthRoute from '../util/route_util';

import Nav from './Nav';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Dashboard from './dashboard/Dashboard';
import UploadImage from './UploadImage';
import CompleteUser from './CompleteUser'
import RouteBuilder from './RouteBuilder/RouteBuilder';
import {} from '../stylesheets/reset.scss';

const App = () => (
  <div>
    <Nav />
    <div className='app-container'>
      <Switch>
        <AuthRoute path='/onboarding' component={CompleteUser} routeType="protected" />
        <AuthRoute path='/register' component={Register} routeType='auth' />
        <AuthRoute path='/login' component={Login} routeType='auth' />
        <AuthRoute path='/upload' component={UploadImage} routeType="protected"/>
        <AuthRoute path='/dashboard' component={Dashboard} routeType='protected' />
        <AuthRoute path="/routes/new" component={RouteBuilder} routeType="prot" />
        <AuthRoute path='/' component={Landing} routeType='auth' />
        <Redirect to='/' />
      </Switch>
    </div>
  </div>
);

export default App;
