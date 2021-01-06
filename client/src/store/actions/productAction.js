import axios from 'axios';
import {
  GET_PRODUCT_LIST,
  LOADING,
  LOADING_FORM_PRODUCT,
  GET_API_ERROR,
  GET_API_MESSAGE,
} from './types';

//GET PRODUCTS BY subId

export const getProductsListAction = (data) => async (dispatch) => {
  console.log('getProductsListAction data', data);
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    const res = await axios.get(`/api/v1/product/${data.subId}`);
    dispatch({
      type: LOADING,
      payload: false,
    });
    dispatch({
      type: GET_PRODUCT_LIST,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: LOADING,
      payload: false,
    });
    console.log('error to get categories list', err);
  }
};

// CREATE PRODUCT

export const createProductAction = (data) => async (dispatch) => {
  dispatch({
    type: LOADING_FORM_PRODUCT,
    payload: true,
  });

  try {
    const res = await axios.post('/api/v1/product', data);

    // RELOAD PRODUCTS LIST
    const list = await axios.get(`/api/v1/product/${data.sub}`);
    dispatch({
      type: LOADING_FORM_PRODUCT,
      payload: false,
    });
    dispatch({
      type: GET_PRODUCT_LIST,
      payload: list.data.data,
    });

    console.log('res.data createProductAction', res.data);
    dispatch({
      type: GET_API_MESSAGE,
      payload: res.data.message,
    });
  } catch (err) {
    dispatch({
      type: LOADING_FORM_PRODUCT,
      payload: false,
    });
    console.log('error createProductAction', err.response.data);
    dispatch({
      type: GET_API_ERROR,
      payload: err.response.data.message,
    });
  }
};
