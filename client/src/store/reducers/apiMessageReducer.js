import {
  GET_API_MESSAGE,
  CLEAR_API_MESSAGE,
  GET_API_MESSAGE_CATEGORY,
  GET_API_MESSAGE_RATING,
} from '../actions/types';

const initialState = {
  message: null,
  messageCategory: null,
  messageRating: null,
};

const apiMessageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_API_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case GET_API_MESSAGE_CATEGORY:
      return {
        ...state,
        messageCategory: action.payload,
      };
    case GET_API_MESSAGE_RATING:
      return {
        ...state,
        messageRating: action.payload,
      };
    case CLEAR_API_MESSAGE:
      return {
        ...state,
        message: null,
        messageCategory: null,
      };

    default:
      return state;
  }
};

export default apiMessageReducer;
