import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import apiMessageReducer from './apiMessageReducer';
import apiErrorReducer from './apiErrorReducer';

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  message: apiMessageReducer,
  error: apiErrorReducer,
});
