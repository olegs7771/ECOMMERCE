import { LOADING, LOADING_ITEM_CATEGORY } from '../actions/types';

const initialState = {
  loading: false,
  loadingItemCategory: false,
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

    default:
      return state;
  }
};

export default authReducer;
