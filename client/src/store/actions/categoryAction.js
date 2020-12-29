import axios from 'axios';
import { GET_CATEGORIES_LIST, LOADING } from './types';

export const getCategoriesList = () => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    const res = await axios.get('/api/v1/category');
    dispatch({
      type: LOADING,
      payload: false,
    });
    dispatch({
      type: GET_CATEGORIES_LIST,
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

// CREATE NEW CATEGORY
export const createCategoryAction = (data) => async (dispatch) => {
  console.log('create category action data', data);
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    const res = await axios.post('/api/v1/category', data);
    console.log('res.data', res.data);
    //FETCH CATEGORY LIST TO UPDATE REDUX STATE
    const list = await axios.get('/api/v1/category');
    dispatch({
      type: LOADING,
      payload: false,
    });

    dispatch({
      type: GET_CATEGORIES_LIST,
      payload: list.data.data,
    });
  } catch (err) {
    console.log('error in creating category', err);
  }
};

// UPDATE CATEGORY NAME
export const updateCategoryAction = (data) => async (dispatch) => {
  console.log('update action data', data);
  try {
    const res = await axios.put(`/api/v1/category/${data.slug}`, data);
    console.log('res.data', res.data);
  } catch (err) {
    console.log('error to update category'.err);
  }
};

// DELETE CATEGORY

export const deleteCategoryAction = (data) => async (dispatch) => {
  console.log('data', data);
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    const res = await axios.delete(`/api/v1/category/${data.slug}`);
    dispatch({
      type: LOADING,
      payload: false,
    });
    console.log('res.data', res.data);
    //FETCH CATEGORY LIST TO UPDATE REDUX STATE
    dispatch({
      type: LOADING,
      payload: true,
    });
    const list = await axios.get('/api/v1/category');
    dispatch({
      type: GET_CATEGORIES_LIST,
      payload: list.data.data,
    });
    dispatch({
      type: LOADING,
      payload: false,
    });
  } catch (err) {
    dispatch({
      type: LOADING,
      payload: false,
    });
    console.log('error to delete category');
  }
};
