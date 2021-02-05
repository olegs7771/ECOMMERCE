import {
  GET_PRODUCT_LIST,
  GET_PRODUCT_ALL,
  GET_PRODUCT_OBJECT,
  GET_PRODUCT_INTO_CART,
  REMOVE_PRODUCT_FROM_CART,
} from '../actions/types';

const initialState = {
  products: [],
  product: null,
  shoppingcart: [],
};
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT_ALL:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT_OBJECT:
      return {
        ...state,
        product: action.payload,
      };
    case GET_PRODUCT_INTO_CART:
      return {
        ...state,
        shoppingcart: action.payload,
      };

    default:
      return state;
  }
};

export default productReducer;
