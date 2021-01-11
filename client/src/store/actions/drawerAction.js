import { DRAWER_LEFT } from './types';

export const drawerLeft = (state) => (dispatch) => {
  dispatch({
    type: DRAWER_LEFT,
    payload: state,
  });
};
