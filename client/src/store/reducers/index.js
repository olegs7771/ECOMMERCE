import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import apiMessageReducer from './apiMessageReducer';
import apiErrorReducer from './apiErrorReducer';
import categoryReducer from './categoryReducer';
import subReducer from './subReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';
import drawerReducer from './drawerReducer';
import cookieReducer from './cookieReducer';
import orderReducer from './orderReducer';

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  message: apiMessageReducer,
  error: apiErrorReducer,
  category: categoryReducer,
  sub: subReducer,
  product: productReducer,
  cart: cartReducer,
  drawer: drawerReducer,
  cookie: cookieReducer,
  order: orderReducer,
});
