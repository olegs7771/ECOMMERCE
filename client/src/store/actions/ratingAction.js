//Rate product For User
import {
  LOADING_RATING,
  GET_PRODUCT_OBJECT,
  GET_API_MESSAGE_RATING,
} from './types';
import axios from 'axios';

export const rateProductAction = (data) => async (dispatch) => {
  console.log('rateProductAction data', data);
  dispatch({
    type: LOADING_RATING,
    payload: true,
  });
  try {
    dispatch({
      type: LOADING_RATING,
      payload: false,
    });
    const res = await axios.post(`/api/v1/rating/${data.productId}`, data);
    console.log('res.data rateProductAction', res.data);
    //RELOAD PRODUCT
    const product = await axios.get(
      `/api/v1/product/${data.productId}/${data.slug}`
    );

    dispatch({
      type: GET_PRODUCT_OBJECT,
      payload: product.data.data,
    });

    dispatch({
      type: GET_API_MESSAGE_RATING,
      payload: res.data.message,
    });
    setTimeout(() => {
      dispatch({
        type: GET_API_MESSAGE_RATING,
        payload: null,
      });
    }, 2000);
  } catch (error) {
    dispatch({
      type: LOADING_RATING,
      payload: false,
    });
    console.log('error rateProductAction', error.response.data);
  }
};
