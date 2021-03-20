import { DRAWER_OPEN } from './types';

export const drawerToggle = (state) => (dispatch) => {
  dispatch({
    type: DRAWER_OPEN,
    payload: state,
  });
};
