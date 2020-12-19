import axios from 'axios';
import { LOADING, GET_API_MESSAGE, GET_API_ERROR } from './types';
import { clearOutUser } from '../actions/authAction';

// UPDATE USER AVATAR

export const updateAvatar = (data, history) => async (dispatch) => {
  console.log('data update user', data);
  dispatch({
    type: LOADING,
    payload: true,
  });

  try {
    const res = await axios.post('/api/v1/users/photo', data);
    dispatch({
      type: LOADING,
      payload: false,
    });
    console.log('res.data', res.data);
    //    AFTER AVATAR UPDATE SIGN OUT USER
    if (res.data) {
      dispatch({
        type: GET_API_MESSAGE,
        payload: res.data.message,
      });
      setTimeout(() => {
        history.push('/');
      }, 4000);
    }
  } catch (err) {
    console.log('err to upload avatar', err.response.data);
    dispatch({
      type: LOADING,
      payload: false,
    });
    dispatch({
      type: GET_API_ERROR,
      payload: err.response.data.message,
    });
  }
};

export const deleteUser = (data, history) => async (dispatch) => {
  console.log('delete data in action', data, history);
  dispatch({
    type: LOADING,
    payload: true,
  });

  try {
    const res = await axios.post('/api/v1/users', data);
    console.log('res.data', res.data);
    dispatch({
      type: LOADING,
      payload: false,
    });
    dispatch({
      type: GET_API_MESSAGE,
      payload: res.data.message,
    });
    //SIGN OUT AFTER 5 SEC
    setTimeout(() => {
      dispatch(clearOutUser());
      localStorage.removeItem('jwtToken');
      history.push('/');
    }, 5000);
  } catch (err) {
    dispatch({
      type: LOADING,
      payload: false,
    });
    dispatch({
      type: GET_API_ERROR,
      payload: err.response.data,
    });

    console.log('err to delete', err.response.data);
    // console.log('err', err);
  }
};
