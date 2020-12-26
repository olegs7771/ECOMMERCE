import React, { useContext, createContext, useState } from 'react';

import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { reload } from './utils/reloadUserAuth';
// ROUTES
import Navigation from './components/navigation/Navigation';
import Home from './components/home/Home';
import Register from './components/auth/Register';
import Confirmation from './components/auth/Confirmation';
import Login from './components/auth/Login';
import Profile from './components/user_profile/Profile';
import Dashboard from './components/dashboard/Dashboard';
//ADMIN
import DashboardAdmin from './components/admin/DashboardAdmin';
import Category from './components/admin/category/Category';
const store = reload(); //ON EVERY RELOAD RESET AUTH USER REDUX STATE

// REDIREXTS AUTH

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
          <Route exact path="/dashboard" component={Dashboard} />
          {/* ADMIN  */}
          <Route exact path="/admin" component={DashboardAdmin} />
          <Route exact path="/admin/category" component={Category} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
