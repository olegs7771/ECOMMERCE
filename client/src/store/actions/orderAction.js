import axios from 'axios';
import {
  GET_API_ERRORS,
  LOADING,
  GET_API_MESSAGE,
  GET_ORDER,
  GET_PRODUCTS_FROM_CART,
} from './types';

// Create Order for Guest
export const createOrderGuestAction = (data) => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  console.log('createOrderGuestAction data', data);
  let res;
  try {
    dispatch({
      type: LOADING,
      payload: false,
    });
    if (data.userId) {
      //User
      res = await axios.post(`/api/v1/order/user/${data.userId}`, data);
      console.log('createOrderGuestAction res.data user', res.data);
    }
    //Guest
    res = await axios.post(`/api/v1/order/guest/${data.guestId}`, data);
    console.log('createOrderGuestAction res.data guest', res.data);

    //GET MESSAGE TO PUSH CHECKOUT PAGE after order created
    dispatch({
      type: GET_API_MESSAGE,
      payload: res.data.status,
    });

    //GET CREATE ORDER INTO REDUX
    dispatch({
      type: GET_ORDER,
      payload: res.data.data,
    });

    //GET CART INTO import { connect } from 'react-redux'
    dispatch({
      type: GET_PRODUCTS_FROM_CART,
      payload: res.data.cart,
    });
  } catch (error) {
    dispatch({
      type: LOADING,
      payload: false,
    });
    console.log('error createOrderGuestAction ', error.response.data);
    dispatch({
      type: GET_API_ERRORS,
      payload: error.response.data.error,
    });
  }
};

// FETCH ORDER FOR CHECKOUT PAGE

export const getOrderAction = (data) => (dispatch) => {
  console.log('getOrderAction data', data);
};
