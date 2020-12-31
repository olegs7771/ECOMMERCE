import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import apiMessageReducer from './apiMessageReducer';
import apiErrorReducer from './apiErrorReducer';
import categoryReducer from './categoryReducer';
import subReducer from './subReducer';

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  message: apiMessageReducer,
  error: apiErrorReducer,
  category: categoryReducer,
  sub: subReducer,
});
