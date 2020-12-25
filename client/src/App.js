import React, { useContext, createContext, useState } from 'react';

import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { reload } from './utils/reloadUserAuth';
// ROUTES
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import Confirmation from './components/auth/Confirmation';
import Login from './components/auth/Login';
import Profile from './components/user_profile/Profile';
//ADMIN
import DashboardAdmin from './components/admin/DashboardAdmin';

const store = reload();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/confirm/:id/:token" component={Confirmation} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/dashboard-admin" component={DashboardAdmin} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
