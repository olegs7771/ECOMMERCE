import {
  GET_API_ERRORS,
  GET_API_ERROR_MESSAGE,
  CLEAR_API_ERROR,
} from '../actions/types';

const initialState = {
  errors: {},
  errorMessage: null,
};

const apiErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_API_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case GET_API_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case CLEAR_API_ERROR:
      return {
        ...state,
        errors: {},
        errorMessage: null,
      };

    default:
      return state;
  }
};

export default apiErrorReducer;
