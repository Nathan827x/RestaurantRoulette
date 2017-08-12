import React from 'react';

import { IndexRoute, Router, Route, hashHistory } from 'react-router'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Layout from './pages/layout/layout'
import Register from './pages/register/register'
import Profile from './pages/profile/profile'
// import EnsureLoggedInContainer from './pages/auth/auth'

export default (

  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
    </Route>
  </Router>
);

// <Route component={EnsureLoggedInContainer}>
//   <Route path='/profile' component={Profile}></Route>
// </Route>
