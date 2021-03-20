import { GET_ORDER, GET_ALL_ORDERS, CLEAR_ORDER_STATE } from '../actions/types';

const initialState = {
  order: {},
  orders: [],
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        orders: action.payload,
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
