import React from 'react';
import { withCookies } from 'react-cookie';
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
import ProductPage from './components/product/ProductPage';
import Dashboard from './components/dashboard/Dashboard';
import ShoppingCart from './components/shoppingcart/ShoppingCart';
import axios from 'axios';

// Drawer

const App = (props) => {
  const store = reload(props.allCookies); //ON EVERY RELOAD RESET AUTH USER REDUX STATE
  // IF sessionId expired or cleared fetch new guest token and userId

  if (!props.allCookies.sessionId) {
    const fetchUserId = async () => {
      try {
        const res = await axios.get('/api/v1/users');
        console.log('res.data fetchUserId', res.data);
      } catch (error) {
        console.log('error fetchUserId', error.response.data);
      }
    };
    fetchUserId();
  }

  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Drawer />
        <Switch>
          <Route
            exact
            path="/"
            // component={Home}
            render={() => <Home cookies={props.cookies} />}
          />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/category" component={CategoryPage} />
          <Route
            exact
            path="/product/:productId/:slug/:categoryId/:categorySlug"
            component={ProductPage}
          />
          <Route
            exact
            path="/shoppingcart"
            render={() => <ShoppingCart cookies={props.cookies} />}
            // component={ShoppingCart}
          />
          <Route
            exact
            path="/category/:slug/:categoryId"
            component={CategorySingle}
            // render={() => <CategorySingle cookies={props.cookies} />}
          />
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

export default withCookies(App);
