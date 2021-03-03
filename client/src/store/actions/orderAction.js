import axios from 'axios';
import {
  GET_API_ERRORS,
  LOADING,
  GET_API_MESSAGE,
  GET_ORDER,
  CLEAR_ORDER_STATE,
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
    // dispatch({
    //   type: GET_PRODUCTS_FROM_CART,
    //   payload: res.data.cart,
    // });
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

// FETCH ORDER FOR CHECKOUT PAGE user/guest

export const getOrderAction = (data) => async (dispatch) => {
  console.log('getOrderAction data', data);
  let res;
  try {
    if (data.userId) {
      //User
      res = await axios.get(`/api/v1/order/user/${data.userId}`);
      console.log('res.data getOrderAction', res.data);
    } else {
      //Guest
      res = await axios.get(`/api/v1/order/guest/${data.guestId}`);
      console.log('res.data getOrderAction', res.data);
    }
  } catch (error) {
    console.log('error to get order', error.response.data);
  }
};

//CLEAR ORDER IN REDUX
export const clearOrderStateAction = (data) => (dispatch) => {
  dispatch({
    type: CLEAR_ORDER_STATE,
    payload: {},
  });
};

//Make Payment Intent
export const paymentIntentAction = (data) => async (dispatch) => {
  console.log('paymentIntentAction data', data);

  try {
    const res = await axios.post(`/api/v1/order/guest/payment/${}`)
  } catch (error) {
    console.log('error paymentIntentAction ', error.response.data);
  }
};
