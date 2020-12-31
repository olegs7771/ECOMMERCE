import { GET_SUB_LIST, LOADING_ITEM_CATEGORY, LOADING } from './types';
import axios from 'axios';

//GET SUB LIST

export const getSubListAction = (data) => async (dispatch) => {
  console.log('get sub list data', data);
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
      type: GET_SUB_LIST,
      payload: list.data.data,
    });
  } catch (err) {
    console.log('error in creating category', err);
  }
};
