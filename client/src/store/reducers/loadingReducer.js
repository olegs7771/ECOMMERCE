import {
  LOADING,
  LOADING_ITEM_CATEGORY,
  LOADING_FORM_PRODUCT,
  LOADING_PRODUCTS,
  LOADING_PRODUCT_CART,
} from '../actions/types';

const initialState = {
  loading: false,
  loadingItemCategory: false,
  loadingFormProduct: false,
  loadingProducts: false,
  loadingProductCart: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case LOADING_ITEM_CATEGORY:
      return {
        ...state,
        loadingItemCategory: action.payload,
      };
    case LOADING_FORM_PRODUCT:
      return {
        ...state,
        loadingFormProduct: action.payload,
      };
    case LOADING_PRODUCTS:
      return {
        ...state,
        loadingProducts: action.payload,
      };
    case LOADING_PRODUCT_CART:
      return {
        ...state,
        loadingProductCart: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
