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
