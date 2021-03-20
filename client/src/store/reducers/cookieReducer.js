import { SET_COOKIE } from '../actions/types';

const initialState = {
  cookie: {},
};

const cookieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COOKIE:
      return {
        ...state,
        cookie: action.payload,
      };

    default:
      return state;
  }
};

export default cookieReducer;
