import axios from 'axios';
import { GET_API_ERRORS } from './types';

// Create Order for Guest
export const createOrderGuestAction = (data) => async (dispatch) => {
  console.log('createOrderGuestAction data', data);
  let res;
  try {
    if (data.userId) {
      //User
      res = await axios.post(`/api/v1/order/user/${data.userId}`, data);
      console.log('createOrderGuestAction res.data user', res.data);
    }
    //Guest
    res = await axios.post(`/api/v1/order/guest/${data.guestId}`, data);
    console.log('createOrderGuestAction res.data guest', res.data);
  } catch (error) {
    console.log('error createOrderGuestAction ', error.response.data);
    dispatch({
      type: GET_API_ERRORS,
      payload: error.response.data.error,
    });
  }
};
