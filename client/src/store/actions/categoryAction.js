import axios from 'axios';
import { GET_CATEGORIES_LIST } from './types';

export const getCategoriesList = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/category');
    console.log('get category action');
    console.log('res.data', res.data);
    dispatch({
      type: GET_CATEGORIES_LIST,
      payload: res.data.data,
    });
  } catch (err) {
    console.log('error to get categories list', err);
  }
};
