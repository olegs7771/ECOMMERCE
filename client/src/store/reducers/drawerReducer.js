import { DRAWER_LEFT } from '../actions/types';

const initialState = {
  drawer_left: false,
};

const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case DRAWER_LEFT:
      return {
        ...state,
        drawer_left: action.payload,
      };
    default:
      return state;
  }
};
export default drawerReducer;
