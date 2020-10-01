import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Signin from '../pages/Signin';
import SignUp from '../pages/SignUp';

// import { AuthProvider } from '../context/AuthContext';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/dashboard" exact component={Dashboard} />
    <Route path="/" exact component={Signin} />
    <Route path="/sign-up" component={SignUp} />
  </Switch>
);

export default Routes;
