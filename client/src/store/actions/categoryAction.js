import axios from 'axios';

export const getCategoriesList = (data, history) => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/category');
    console.log('res.data', res.data);
  } catch (err) {
    console.log('error to get categories list', err);
  }
};
