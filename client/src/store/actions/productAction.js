import axios from 'axios';
import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_ALL,
  LOADING,
  LOADING_FORM_PRODUCT,
  GET_PRODUCT_OBJECT,
  GET_API_ERROR,
  GET_API_MESSAGE,
} from './types';

//GET PRODUCTS BY subId

export const getProductsListAction = (data) => async (dispatch) => {
  // console.log('getProductsListAction data', data);
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

// GET ONE PRODUCT BY productId && slug

export const getOneProduct = (data) => async (dispatch) => {
  // console.log('getOneProduct data', data);
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    const res = await axios.get(
      `/api/v1/product/${data.productId}/${data.slug}`
    );
    dispatch({
      type: LOADING,
      payload: false,
    });
    // console.log('res.data getOneProduct', res.data);
    dispatch({
      type: GET_PRODUCT_OBJECT,
      payload: res.data.data,
    });
  } catch (err) {
    dispatch({
      type: LOADING,
      payload: false,
    });

    console.log('error in getOneProduct', err.response.data);
  }
};

//GET ALL EXISTING PRODUCTS TO SHOW IN SUBS ITEM QUATITY
export const getProductsAllAction = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/product/`);

    dispatch({
      type: GET_PRODUCT_ALL,
      payload: res.data.data,
    });
  } catch (err) {
    console.log('error to get categories list', err);
    dispatch({
      type: GET_API_ERROR,
      payload: err.response.data.message,
    });
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
    if (err.response.data.message) {
      dispatch({
        type: GET_API_ERROR,
        payload: err.response.data.message,
      });
    }
    dispatch({
      type: GET_API_ERROR,
      payload: err.response.data.error,
    });
  }
};

// DELETE PRODUCT
// data:{productId,slug,subId}

export const deleteOneProduct = (data) => async (dispatch) => {
  console.log('deleteOneProduct data', data);
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    const res = await axios.delete(`/api/v1/product/${data.id}/${data.slug}`);
    // RELOAD PRODUCTS BY subId

    const list = await axios.get(`/api/v1/product/${data.sub}`);
    dispatch({
      type: GET_PRODUCT_LIST,
      payload: list.data.data,
    });

    dispatch({
      type: LOADING,
      payload: false,
    });

    console.log('res.data deleteOneProduct ', res.data);
  } catch (err) {
    console.log('error to delete', err.response.data);
  }
};

// UPDATE PRODUCT
export const updateProductAction = (data) => async (dispatch) => {
  console.log('updateProductAction data', data);
  dispatch({
    type: LOADING,
    payload: true,
  });

  try {
    const res = await axios.put(`/api/v1/product/${data._id}/${data.slug}`);
    console.log('res.data updateProductAction ', res.data);
    // RELOAD PRODUCTS BY subId

    const list = await axios.get(`/api/v1/product/${data.sub}`);
    dispatch({
      type: GET_PRODUCT_LIST,
      payload: list.data.data,
    });

    dispatch({
      type: LOADING,
      payload: false,
    });

    dispatch({
      type: LOADING,
      payload: false,
    });
  } catch (err) {
    console.log('error in update product', err.response.data);
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
