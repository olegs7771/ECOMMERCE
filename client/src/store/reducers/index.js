import { combineReducers } from 'redux';
import authReducer from './authReducer';
import loadingReducer from './loadingReducer';
import apiMessageReducer from './apiMessageReducer';
import apiErrorReducer from './apiErrorReducer';
import googleOAuth2Reducer from './googleOAuth2Reducer';

export default combineReducers({
  auth: authReducer,
  loading: loadingReducer,
  message: apiMessageReducer,
  error: apiErrorReducer,
  googleOauth2: googleOAuth2Reducer,
});
