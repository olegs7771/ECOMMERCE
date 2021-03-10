import {
  GET_PRODUCTS_FROM_CART,
  GET_PRODUCTS_FROM_CART_PAID,
  // REMOVE_PRODUCT_FROM_CART,
} from '../actions/types';

const initialState = {
  shoppingcart: { products: [] },
  cart_paid: { products: [] },
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS_FROM_CART:
      return {
        ...state,
        shoppingcart: action.payload,
      };
    case GET_PRODUCTS_FROM_CART_PAID:
      return {
        ...state,
        cart_paid: action.payload,
      };

    default:
      return state;
  }
};

export default cartReducer;
