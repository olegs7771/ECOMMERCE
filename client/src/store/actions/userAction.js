import axios from 'axios';
import { LOADING } from './types';

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
      history.push('/');
    }
  } catch (err) {
    console.log('err to upload avatar', err.response.data);
  }
};
