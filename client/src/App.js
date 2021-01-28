import React from 'react';

import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { reload } from './utils/reloadUserAuth';
// ROUTES
import Navigation from './components/navigation/Navigation';
import Drawer from './components/drawer/Drawer';
import Register from './components/auth/Register';
import Confirmation from './components/auth/Confirmation';
import Login from './components/auth/Login';
import Profile from './components/user_profile/Profile';

//ADMIN
import DashboardAdmin from './components/admin/admin/DashboardAdmin';
import Category from './components/admin/category/Category';
import Sub from './components/admin/sub/Sub';
import Product from './components/admin/product/Product';
import Card from './components/admin/card/Card';
// PUBLIC
import Home from './components/home/Home';
import CategoryPage from './components/category/Category';
import CategorySingle from './components/category/CategorySingle';
import Dashboard from './components/dashboard/Dashboard';

const store = reload(); //ON EVERY RELOAD RESET AUTH USER REDUX STATE

// Drawer

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Drawer />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/category" component={CategoryPage} />
          <Route exact path="/category/:slug" component={CategorySingle} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/confirm/:id/:token" component={Confirmation} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />

          {/* ADMIN  */}
          <Route exact path="/admin" component={DashboardAdmin} />
          <Route exact path="/admin/category" component={Category} />
          <Route exact path="/admin/sub/:categoryId/:slug" component={Sub} />
          <Route
            exact
            path="/admin/:subId/:category/:categoryId/:slug"
            component={Product}
          />
          <Route
            exact
            path="/product/:productId/:slug/:categoryId/:category/:subId"
            component={Card}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
