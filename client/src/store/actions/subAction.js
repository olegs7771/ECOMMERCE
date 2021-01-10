import {
  GET_SUB_LIST,
  LOADING_ITEM_CATEGORY,
  LOADING,
  GET_API_MESSAGE,
  GET_API_ERROR,
  // CLEAR_API_ERROR,
  GET_SUB_ALL,
} from './types';
import axios from 'axios';

//GET SUB LIST by category slug

export const getSubListAction = (data) => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });

  try {
    const res = await axios.get(`/api/v1/sub/${data.categoryId}`);
    // console.log('res.data getSubListAction', res.data);
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

// GET ALL EXISTING SUB-CATEGORIES

export const getAllSubAction = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/sub');

    dispatch({
      type: GET_SUB_ALL,
      payload: res.data.data,
    });
  } catch (err) {
    console.log('error getAllSubAction ');
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
    //FETCH SUB LIST TO UPDATE REDUX STATE
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
    console.log('error in creating category', err.response.data);
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
// / UPDATE CATEGORY NAME
export const updateSubAction = (data) => async (dispatch) => {
  console.log('update sub action data', data);
  dispatch({
    type: LOADING_ITEM_CATEGORY,
    payload: true,
  });
  try {
    const update = await axios.put(`/api/v1/sub/${data.slug}`, data);
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
    const res = await axios.get(`/api/v1/sub/${data.categoryId}`);

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

// DELETE SUB-CATEGORY
// data:{sub-slug,categoryId,subId}

export const deleteSubAction = (data) => async (dispatch) => {
  console.log(' deleteSubAction data ', data);
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    // 1) DELETE PRODUCTS
    await axios.delete(`/api/v1/product/sub/${data.subId}`);
    // 2) DELETE SUB-CATEGORY
    await axios.delete(`/api/v1/sub/${data.slug}`);

    dispatch({
      type: LOADING,
      payload: false,
    });

    setTimeout(async () => {
      //FETCH CATEGORY LIST TO UPDATE REDUX STATE
      dispatch({
        type: LOADING,
        payload: true,
      });
      //FETCH SUB LIST TO UPDATE REDUX STATE
      const list = await axios.get(`/api/v1/sub/${data.categoryId}`);
      dispatch({
        type: LOADING,
        payload: false,
      });
      dispatch({
        type: GET_SUB_LIST,
        payload: list.data.data,
      });
    }, 4000);
  } catch (err) {
    dispatch({
      type: LOADING,
      payload: false,
    });
    console.log('error to delete category');
  }
};
