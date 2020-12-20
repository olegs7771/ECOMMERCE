import axios from 'axios';
import {
  SET_CURRENT_USER,
  CLEAR_OUT_USER,
  GET_API_ERROR,
  GET_API_MESSAGE,
  LOADING,
  GOOGLE_OAUTH2,
} from './types';
import jwt_decoded from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';

//SIGN NEW USER WITH FORM OR OAUTH2 GOOGLE
export const signupUserAction = (data, history) => async (dispatch) => {
  console.log('data in signup action', data);
  ////////////////////////////////////////////////////////////////////
  //1) CHECK IF SIGNINGUP WITH data.avatar THAN IT'S oAUth2 GOOGLE
  if (data.avatar) {
    console.log('AUTH2 in action');
    try {
      const res = await axios.post('/api/v1/users/signup', data);
      console.log('res.data', res.data);

      //2) CHECK IF USER ALREADY CREATED THEN LOG IN
      if (res.data.message.startsWith('Login')) {
        console.log('Login Existing User');
        if (res.data.token) {
          const { token } = res.data;

          // SET TOKEN IN localStorage
          localStorage.setItem('jwtToken', token);

          //SET TOKEN
          setAuthToken();

          const decoded = jwt_decoded(token);
          console.log('decoded', decoded);
          const dataToRedux = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
            avatar: decoded.avatar,
          };
          dispatch(setCurrentUser(dataToRedux));
          history.push('/');
        }
      } else {
        // USER NOT EXISTS SIGNUP AND LOGIN
        console.log('Login New User');
        if (res.data.token) {
          const { token } = res.data;

          // SET TOKEN IN localStorage
          localStorage.setItem('jwtToken', token);

          //SET TOKEN
          setAuthToken();

          const decoded = jwt_decoded(token);
          console.log('decoded', decoded);
          const dataToRedux = {
            id: decoded.id,
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
            avatar: decoded.avatar,
          };
          dispatch(setCurrentUser(dataToRedux));
          history.push('/');
        }
      }
    } catch (err) {
      console.log('err:', err);
      dispatch({
        type: GET_API_ERROR,
        payload: err.response.data.message,
      });
    }
  } else {
    //////////////////////////////////////////////////////////////////////////
    // SIGNING UP WITH FORM
    try {
      dispatch({
        type: LOADING,
        payload: true,
      });
      const res = await axios.post('/api/v1/users/signup', data);
      console.log('res.data', res.data);
      dispatch({
        type: LOADING,
        payload: false,
      });
      dispatch({
        type: GET_API_MESSAGE,
        payload: res.data.message,
      });
    } catch (err) {
      console.log('err', err.response.data);
      dispatch({
        type: LOADING,
        payload: false,
      });
      dispatch({
        type: GET_API_ERROR,
        payload: err.response.data.message,
      });
    }
  }
};

//CONFIRM BY EMAIL
//USER RECEIVES EMAIL  LINK WITH ID AND TOKEN AND REDIRECTS
// TO REACT PAGE

export const confirmUser = (data) => async (dispatch) => {
  console.log('confirm actin data', data);
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    const res = await axios.post('/api/v1/users/confirm', data);
    console.log('res.data', res.data);
    dispatch({
      type: LOADING,
      payload: false,
    });
    dispatch({
      type: GET_API_MESSAGE,
      payload: res.data.message,
    });
  } catch (err) {
    dispatch({
      type: LOADING,
      payload: false,
    });
    dispatch({
      type: GET_API_ERROR,
      payload: err.response.data,
    });
    console.log('error confirm ', err.response.data);
  }
};

// LOGIN USER
export const loginUserAction = (data, history) => async (dispatch) => {
  console.log('data in action', data);
  try {
    const res = await axios.post('/api/v1/users/login', data);
    console.log('res.data', res.data);
    if (res.data.token) {
      const { token } = res.data;

      // SET TOKEN IN localStorage
      localStorage.setItem('jwtToken', token);

      //SET TOKEN
      setAuthToken();

      const decoded = jwt_decoded(token);
      console.log('decoded', decoded);
      const dataToRedux = {
        id: decoded.id,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        avatar: decoded.avatar,
      };
      dispatch(setCurrentUser(dataToRedux));
      history.push('/');
    }
  } catch (err) {
    console.log('err:', err.response.data);
    dispatch({
      type: GET_API_ERROR,
      payload: err.response.data,
    });
  }
};

// OAUTH2 GOOGLE API
export const googleOAUth2 = (googleResponse) => async (dispatch) => {
  if (typeof googleResponse === 'undefined') {
    googleResponse = [];
  }
  dispatch({
    type: GOOGLE_OAUTH2,
    payload: googleResponse,
  });
};

//SET CURRENT USER
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

//CLEAR OUT USER LOGOUT
export const clearOutUser = () => {
  return {
    type: CLEAR_OUT_USER,
  };
};
