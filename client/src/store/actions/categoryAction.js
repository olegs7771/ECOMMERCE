import axios from 'axios';
import {
  GET_CATEGORIES_LIST,
  GET_CATEGORY,
  LOADING,
  LOADING_ITEM_CATEGORY,
  GET_API_ERROR_MESSAGE,
  GET_API_ERRORS,
  CLEAR_API_ERROR,
  GET_API_MESSAGE,
  CLEAR_API_MESSAGE,
} from './types';

// GET ALL CATEGORIES
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

// GET ONE CATEGORY BY SLUG
export const getCategoryAction = (data) => async (dispatch) => {
  console.log('getCategoryAction data', data);
  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    const res = await axios.get(`/api/v1/category/${data.slug}`);
    dispatch({
      type: LOADING,
      payload: false,
    });

    dispatch({
      type: GET_CATEGORY,
      payload: res.data.data,
    });
  } catch (error) {
    console.log('error getCategoryAction ', error);
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
    console.log('error in creating category', err.response.data);

    dispatch({
      type: LOADING,
      payload: false,
    });

    if (err.response.data.message) {
      dispatch({
        type: GET_API_ERROR_MESSAGE,
        payload: err.response.data.message,
      });
    }
    dispatch({
      type: GET_API_ERRORS,
      payload: err.response.data.error,
    });
  }
};

// UPDATE CATEGORY NAME and DESCRIPTION
export const updateCategoryAction = (data) => async (dispatch) => {
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
      type: GET_CATEGORIES_LIST,
      payload: res.data.data,
    });

    // CLEAR ERRORS
    dispatch({
      type: GET_API_ERROR_MESSAGE,
      payload: null,
    });
  } catch (err) {
    dispatch({
      type: LOADING_ITEM_CATEGORY,
      payload: false,
    });
    console.log('error to update category', err.response.data);
    dispatch({
      type: GET_API_ERRORS,
      payload: err.response.data.error,
    });
  }
};

// DELETE CATEGORY=> DELETE ALL SUB-CATEGORIES OF THIS CATEGORY=>DELETE ALL PRODUCTS
// data:{categoryId,categorySlug}
export const deleteCategoryAction = (data) => async (dispatch) => {
  console.log('data deleteCategoryAction', data);

  dispatch({
    type: LOADING,
    payload: true,
  });
  try {
    //1)DELETE products
    await axios.delete(`/api/v1/product/category/${data.categoryId}`);

    // 2) DELETE sub-category
    await axios.delete(`/api/v1/sub/${data.categoryId}/${data.slug}`);
    // 3) DELETE category
    await axios.delete(`/api/v1/category/${data.slug}`);

    // RELOAD ALL CATEGORIES
    setTimeout(async () => {
      const list = await axios.get('/api/v1/category');
      dispatch({
        type: GET_CATEGORIES_LIST,
        payload: list.data.data,
      });
      dispatch({
        type: LOADING,
        payload: false,
      });
    }, 3000);
  } catch (err) {
    dispatch({
      type: LOADING_ITEM_CATEGORY,
      payload: false,
    });
    console.log('error to delete category', err.response.data);
  }
};

// CLEAR API ERROR IN REDUX STATE

export const clearErrorReduxState = () => (dispatch) => {
  dispatch({
    type: CLEAR_API_ERROR,
  });
};

// CLEAR API MESSAGE IN REDUX STATE
export const clearMessageReduxState = () => (dispatch) => {
  dispatch({
    type: CLEAR_API_MESSAGE,
  });
};
