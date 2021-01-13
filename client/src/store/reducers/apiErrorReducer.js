import { GET_API_ERROR, CLEAR_API_ERROR } from '../actions/types';

const initialState = {
  error: {},
};

const apiErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_API_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_API_ERROR:
      return {
        ...state,
        error: {},
      };

    default:
      return state;
  }
};

export default apiErrorReducer;
