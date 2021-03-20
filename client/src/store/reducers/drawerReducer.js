import { DRAWER_OPEN } from '../actions/types';

const initialState = {
  drawer: false,
};

const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case DRAWER_OPEN:
      return {
        ...state,
        drawer: action.payload,
      };
    default:
      return state;
  }
};
export default drawerReducer;
