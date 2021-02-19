import { SET_COOKIE } from './types';

export const setCookieAction = (data) => (dispatch) => {
  // console.log('setCookieAction data', data);
  dispatch({
    type: SET_COOKIE,
    payload: data,
  });
};
