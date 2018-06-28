import * as React from 'react';

import {Route, Switch} from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login'

const getRoutes = () => (
  <Switch>
    <Route exact={true} path="/" component={Home}/>
    <Route path="/login" component={Login} />
  </Switch>
);

export default getRoutes;