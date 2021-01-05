import axios from 'axios';
import { GET_PRODUCT_LIST, LOADING } from './types';

//GET PRODUCTS BY subId

export const getProductsListAction = (data) => async (dispatch) => {
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
