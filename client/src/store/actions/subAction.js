import {
  GET_SUB_LIST,
  LOADING_ITEM_CATEGORY,
  LOADING,
  GET_API_MESSAGE,
  GET_API_ERROR,
} from './types';
import axios from 'axios';

//GET SUB LIST

export const getSubListAction = (data) => async (dispatch) => {
  console.log('getSubListAction', data);
  dispatch({
    type: LOADING,
    payload: true,
  });

  try {
    const res = await axios.get(`/api/v1/sub/${data.categoryId}`);
    console.log('res.data', res.data);
    dispatch({
      type: LOADING,
      payload: false,
    });
    dispatch({
      type: GET_SUB_LIST,
      payload: res.data.data,
    });
  } catch (err) {
    console.log('error to get list of subs', err.response.data);
    dispatch({
      type: LOADING,
      payload: false,
    });
  }
};

// CREATE NEW CATEGORY
export const createSubAction = (data) => async (dispatch) => {
  console.log('create category action data', data);
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    const res = await axios.post('/api/v1/sub', data);
    console.log('res.data', res.data);
    //FETCH CATEGORY LIST TO UPDATE REDUX STATE
    const list = await axios.get(`/api/v1/sub/${data.categoryId}`);
    dispatch({
      type: LOADING,
      payload: false,
    });

    dispatch({
      type: GET_SUB_LIST,
      payload: list.data.data,
    });
  } catch (err) {
    console.log('error in creating category', err);
  }
};
// / UPDATE CATEGORY NAME
export const updateSubAction = (data) => async (dispatch) => {
  console.log('update action data', data);
  dispatch({
    type: LOADING_ITEM_CATEGORY,
    payload: true,
  });
  try {
    const update = await axios.put(`/api/v1/category/${data.slug}`, data);
    console.log('update.data', update.data);
    dispatch({
      type: LOADING_ITEM_CATEGORY,
      payload: false,
    });

    dispatch({
      type: GET_API_MESSAGE,
      payload: update.data.message,
    });

    //FETCH CATEGORY LIST TO UPDATE REDUX STATE
    const res = await axios.get('/api/v1/category');

    dispatch({
      type: GET_SUB_LIST,
      payload: res.data.data,
    });

    // CLEAR ERRORS
    dispatch({
      type: GET_API_ERROR,
      payload: null,
    });
  } catch (err) {
    dispatch({
      type: LOADING_ITEM_CATEGORY,
      payload: false,
    });
    console.log('error to update category', err.response.data);
    dispatch({
      type: GET_API_ERROR,
      payload: err.response.data.message,
    });
  }
};
