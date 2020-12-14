import axios from 'axios';

// UPDATE USER AVATAR

export const updateAvatar = (data, history) => async (dispatch) => {
  console.log('data update user', data);

  try {
    const res = await axios.post('/api/v1/users/photo', data);
    console.log('res.data', res.data);
    //    AFTER AVATAR UPDATE SIGN OUT USER
    if (res.data) {
      history.push('/');
    }
  } catch (err) {
    console.log('err to upload avatar', err.response.data);
  }
};
