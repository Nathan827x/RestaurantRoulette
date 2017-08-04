import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// For routing
import { IndexRoute, Router, Route, hashHistory } from 'react-router'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Layout from './pages/layout/layout'
import Register from './pages/register/register'

const app = document.getElementById('root');
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path='/login' component={Login}></Route>
      <Route path='/register' component={Register}></Route>
    </Route>
  </Router>, app );
registerServiceWorker();
