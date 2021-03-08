import axios from 'axios';

import {
  LOADING,
  LOADING_PRODUCT_CART,
  // GET_API_ERRORS,
  // GET_API_ERROR_MESSAGE,
  GET_API_MESSAGE,
  GET_PRODUCTS_FROM_CART,
  // REMOVE_PRODUCT_FROM_CART,
} from './types';

// CREATE CART FOR GUEST BY ADDING NEW PRODUCT data={guestId,productId} 🛒
export const getProductInCartAction = (data) => async (dispatch) => {
  console.log('getProductInCartAction data userId', data.userId);
  console.log('getProductInCartAction data guestId', data.guestId);
  dispatch({
    type: LOADING_PRODUCT_CART,
    payload: true,
  });

  try {
    let res;
    let list;
    // CREATE CART AS GUEST
    if (data.guestId) {
      console.log('guest');
      res = await axios.post(`/api/v1/cart/guest/${data.guestId}`, data);
      // FETCH PRODUCTS FROM NEWLY CREATED CART TO SHOW IN HEADER
      list = await axios.get(`/api/v1/cart/guest/${data.guestId}`);
      // CREATE CART AS AN AUTH USER
    } else if (data.userId) {
      console.log('user');
      res = await axios.post(`/api/v1/cart/user/${data.userId}`, data);
      // FETCH PRODUCTS FROM NEWLY CREATED CART TO SHOW IN HEADER
      list = await axios.get(`/api/v1/cart/user/${data.userId}`);
    }
    dispatch({
      type: GET_PRODUCTS_FROM_CART,
      payload: list.data.data,
    });

    dispatch({
      type: GET_API_MESSAGE,
      payload: res.data.message,
    });
    setTimeout(() => {
      dispatch({
        type: GET_API_MESSAGE,
        payload: null,
      });
    }, 6000);
    dispatch({
      type: LOADING_PRODUCT_CART,
      payload: false,
    });

    console.log('res.data getProductInCartAction', res.data);
  } catch (error) {
    dispatch({
      type: LOADING_PRODUCT_CART,
      payload: false,
    });
    console.log('getProductInCartAction error ', error.response.data);
  }
};

// GET PRODUCT FROM SHOPPING CART FOR GUEST
export const getProductsCartGuestAction = (data) => async (dispatch) => {
  // console.log('getProductsCartGuestAction data', data);
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    const res = await axios.get(`/api/v1/cart/cart/${data.guestId}`);
    // console.log('res.data getProductsCartGuestAction', res.data);

    dispatch({
      type: GET_PRODUCTS_FROM_CART,
      payload: res.data.data,
    });
    dispatch({
      type: LOADING,
      payload: false,
    });
  } catch (error) {
    console.log('error getProductsCartGuestAction ', error.response.data);
  }
};
// GET PRODUCT FROM SHOPPING CART FOR USER
export const getProductsCartUserAction = (data) => async (dispatch) => {
  // console.log('getProductsCartUserAction data', data);
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    //GET GUEST SHOPPING CART
    // console.log('guest get productCart');
    const res = await axios.get(`/api/v1/cart/user/${data.userId}`);
    // console.log('res.data getProductsCartUserAction', res.data);

    dispatch({
      type: GET_PRODUCTS_FROM_CART,
      payload: res.data.data,
    });
    dispatch({
      type: LOADING,
      payload: false,
    });
  } catch (error) {
    console.log('error getProductsCartGuestAction ', error.response.data);
  }
};

// UPDATE PRODUCTS IN SHOPPINGCART receive guestId&&productId

export const updateProductCartAction = (data) => async (dispatch) => {
  console.log('updateProductCartAction data', data);

  try {
    let update;
    let res;
    if (data.userId) {
      //User
      update = await axios.put(`/api/v1/cart/cart/user/${data.userId}`, data);
      //RELOAD SHOPPING CART
      res = await axios.get(`/api/v1/cart/cart/user/${data.userId}`);
    } else {
      //Guest
      update = await axios.put(`/api/v1/cart/cart/${data.guestId}`, data);
      //RELOAD SHOPPING CART
      res = await axios.get(`/api/v1/cart/cart/${data.guestId}`);
    }

    dispatch({
      type: GET_PRODUCTS_FROM_CART,
      payload: res.data.data,
    });

    console.log('res.data updateProductCartAction', update.data);

    dispatch({
      type: GET_API_MESSAGE,
      payload: update.data.message,
    });
    //  CLEAR MESSAGE TO STOP LOADING IN ShoppingCartItem.js
    setTimeout(() => {
      dispatch({
        type: GET_API_MESSAGE,
        payload: null,
      });
    }, 3000);
  } catch (error) {
    console.log('error to update product in cart', error.response.data);
  }
};

// REMOVE PRODUCT FROM CART BY productId

export const removeProductAction = (data) => async (dispatch) => {
  console.log('removeProductAction data', data);

  try {
    let res;
    let list;
    if (data.userId) {
      //User
      res = await axios.patch(`/api/v1/cart/cart/user/${data.userId}`, data);
      list = await axios.get(`/api/v1/cart/cart/user/${data.userId}`);
    } else {
      //Guest
      res = await axios.patch(`/api/v1/cart/cart/${data.guestId}`, data);
      list = await axios.get(`/api/v1/cart/cart/${data.guestId}`);
    }
    dispatch({
      type: GET_API_MESSAGE,
      payload: res.data.message,
    });
    // FETCH PRODUCTS FROM NEWLY CREATED CART TO SHOW IN HEADER
    dispatch({
      type: GET_PRODUCTS_FROM_CART,
      payload: list.data.data,
    });

    console.log('res.data removeProductAction', res.data);
    setTimeout(() => {
      dispatch({
        type: GET_API_MESSAGE,
        payload: null,
      });
    }, 6000);
  } catch (error) {
    console.log('error', error.response.data);
  }
};

//DELETE SHOPPING CART EITHER BY USER OR GUEST

export const deleteCartAction = (data) => async (dispatch) => {
  console.log('deleteCartAction data', data);
  let res;
  let list;
  try {
    if (data.userId) {
      //User
      res = await axios.delete(`/api/v1/cart/cart/user/${data.userId}`);
      list = await axios.get(`/api/v1/cart/cart/user/${data.userId}`);
    } else {
      //Guest
      res = await axios.delete(`/api/v1/cart/cart/${data.guestId}`);
      list = await axios.get(`/api/v1/cart/cart/${data.guestId}`);
    }
    console.log('res.data deleteCartAction ', res.data);
    dispatch({
      type: GET_API_MESSAGE,
      payload: res.data.message,
    });
    // FETCH PRODUCTS FROM NEWLY CREATED CART TO SHOW IN HEADER
    dispatch({
      type: GET_PRODUCTS_FROM_CART,
      payload: list.data.data,
    });

    console.log('res.data removeProductAction', res.data);
    setTimeout(() => {
      dispatch({
        type: GET_API_MESSAGE,
        payload: null,
      });
    }, 6000);
  } catch (error) {
    console.log('error to delete ', error.response.data);
  }
};
