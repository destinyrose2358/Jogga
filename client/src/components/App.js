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
import Profile from './Profile'
import {} from '../stylesheets/reset.scss';
import RouteIndex from './route-index/RouteIndex';

const App = () => (
  <div>
    <Nav />      
    <AuthRoute exact path="/routes/new" component={RouteBuilder} routeType="prot" />
    <div className='app-container'>
      <Switch>
        <AuthRoute exact path="/routes/new" component={() => null} routeType="prot" />
        <AuthRoute path='/athletes/:id' component={Profile} routeType="protected" />
        <AuthRoute path='/onboarding' component={CompleteUser} routeType="protected" />
        <AuthRoute path='/register' component={Register} routeType='auth' />
        <AuthRoute path='/login' component={Login} routeType='auth' />
        <AuthRoute path='/upload' component={UploadImage} routeType="protected"/>
        <AuthRoute path='/dashboard' component={Dashboard} routeType='protected' />
        <AuthRoute path='/' exact component={Landing} routeType='auth' />
        <AuthRoute path="/athlete/routes" component={RouteIndex} routeType="proc" />
        <Redirect to='/' />
      </Switch>
    </div>
  </div>
);

export default App;
