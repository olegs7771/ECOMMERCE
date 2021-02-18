import React, { useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// ROUTES
import Navigation from '../components/navigation/Navigation';
import Drawer from '../components/drawer/Drawer';
import Register from '../components/auth/Register';
import Confirmation from '../components/auth/Confirmation';
import Login from '../components/auth/Login';
import Profile from '../components/user_profile/Profile';
//ADMIN
import DashboardAdmin from '../components/admin/admin/DashboardAdmin';
import Category from '../components/admin/category/Category';
import Sub from '../components/admin/sub/Sub';
import Product from '../components/admin/product/Product';
import Card from '../components/admin/card/Card';
// PUBLIC
import Home from '../components/home/Home';
import Footer from '../components/footer/Footer';
import CategoryPage from '../components/category/Category';
import CategorySingle from '../components/category/CategorySingle';
import ProductPage from '../components/product/ProductPage';
import Dashboard from '../components/dashboard/Dashboard';
import ShoppingCart from '../components/shoppingcart/ShoppingCart';

import { useSelector } from 'react-redux';
import { reloadCart } from '../utils/reloadUserAuth';

const MainApp = (props) => {
  // REDUX
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const authRedux = useSelector((state) => state.auth);
  // RELOAD SHOPPING CART FOR AUTH USER.IF NOT LOGGED GET CART FOR GUEST
  if (authRedux.isAuthenticated) {
    console.log('products in cart for user');
    reloadCart(authRedux.user.id, 'user');
  } else {
    if (
      Object.keys(props.cookies.allCookies).some((el) =>
        el.startsWith('productId')
      )
    ) {
      console.log('products in cart for guest');
      reloadCart(props.cookies.allCookies.guestId, 'guest');
    }
  }

  // NO SCROLL ON DRAWER ON
  useEffect(() => {
    if (drawerRedux) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [drawerRedux]);

  return (
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
      <Footer />
    </Router>
  );
};

export default MainApp;
