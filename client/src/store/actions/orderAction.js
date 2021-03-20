import axios from 'axios';
import {
  GET_API_ERRORS,
  LOADING,
  GET_API_MESSAGE,
  GET_ORDER,
  GET_ALL_ORDERS,
  CLEAR_ORDER_STATE,
  GET_PRODUCTS_FROM_CART,
  GET_PRODUCTS_FROM_CART_PAID,
} from './types';

// Create Order for Guest
export const createOrderAction = (data) => async (dispatch) => {
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
      console.log('createOrderUserAction res.data user', res.data);
    } else {
      //Guest
      res = await axios.post(`/api/v1/order/guest/${data.guestId}`, data);
      console.log('createOrderAction res.data guest', res.data);
    }

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
    //GET ORDER INTO REDUX
    dispatch({
      type: GET_ORDER,
      payload: res.data.data.order,
    });
    //GET ORDER INTO REDUX
    dispatch({
      type: GET_PRODUCTS_FROM_CART_PAID,
      payload: res.data.data.cart,
    });
  } catch (error) {
    console.log('error to get order', error.response.data);
  }
};
// FETCH ORDER FOR DASHBOARD BY orderId FOR USER or Guest for receipt page
export const getOrderByIdAction = (data) => async (dispatch) => {
  console.log('getOrderByidAction data', data);
  let res;
  try {
    //User
    if (data.userId) {
      res = await axios.get(
        `/api/v1/order/order/${data.userId}/${data.orderId}`
      );
    } else {
      //Guest
      res = await axios.get(
        `/api/v1/order/order/guest/${data.guestId}/${data.orderId}`
      );
    }
    console.log('res.data getOrderAction', res.data);

    //GET ORDER INTO REDUX
    dispatch({
      type: GET_ORDER,
      payload: res.data.data.order,
    });
    //GET ORDER INTO REDUX
    dispatch({
      type: GET_PRODUCTS_FROM_CART_PAID,
      payload: res.data.data.cart,
    });
  } catch (error) {
    console.log('error to get order', error.response.data);
  }
};

// FETCH ALL ORDERS FOR DASHBOARD USER
export const getAllOrdersAction = (data) => async (dispatch) => {
  console.log('getAllOrdersAction data', data);

  try {
    //User
    const res = await axios.get(`/api/v1/order/user/orders/${data.userId}`);
    console.log('res.data getOrderAction', res.data);

    //GET ORDERS INTO REDUX
    dispatch({
      type: GET_ALL_ORDERS,
      payload: res.data.data,
    });
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
export const paymentIntentAction = (data, history) => async (dispatch) => {
  console.log('paymentIntentAction data', data);

  dispatch({
    type: LOADING,
    payload: true,
  });

  try {
    dispatch({
      type: LOADING,
      payload: false,
    });
    let res;
    if (data.userId) {
      res = await axios.post(`/api/v1/order/user/payment/${data.userId}`, data);
    } else {
      res = await axios.post(
        `/api/v1/order/guest/payment/${data.guestId}`,
        data
      );
    }
    console.log('res.data paymentIntentAction', res.data);

    dispatch({
      type: GET_API_MESSAGE,
      payload: res.data.message,
    });

    //PUSH TO RECIEPT PAGE
    history.push({
      pathname: `/receipt/${res.data.data._id}`,
    });
  } catch (error) {
    console.log('error paymentIntentAction ', error.response.data);
  }
};
