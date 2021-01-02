import { GET_API_MESSAGE, CLEAR_API_MESSAGE } from '../actions/types';

const initialState = {
  message: null,
};

const apiMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_API_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case CLEAR_API_MESSAGE:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export default apiMessageReducer;
