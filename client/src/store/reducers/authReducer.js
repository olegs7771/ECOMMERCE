import { SET_CURRENT_USER, CLEAR_OUT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case CLEAR_OUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
