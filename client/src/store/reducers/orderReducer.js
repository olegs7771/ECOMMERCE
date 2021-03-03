import { GET_ORDER, CLEAR_ORDER_STATE } from '../actions/types';

const initialState = {
  order: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case CLEAR_ORDER_STATE:
      return {
        ...state,
        order: action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
