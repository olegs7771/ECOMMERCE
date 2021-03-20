import { GET_CATEGORIES_LIST, GET_CATEGORY } from '../actions/types';

const initialState = {
  categories: [],
  category: {},
};
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_LIST:
      return {
        ...state,
        categories: action.payload,
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
