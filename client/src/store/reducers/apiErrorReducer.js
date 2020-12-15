import { GET_API_ERROR } from '../actions/types';

const initialState = {
  error: null,
};

const apiErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_API_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default apiErrorReducer;
