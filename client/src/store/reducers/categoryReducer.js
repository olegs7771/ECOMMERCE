import { GET_CATEGORIES_LIST } from '../actions/types';

const initialState = {
  categories: [],
};
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_LIST:
      return {
        ...state,
        categories: action.payload,
      };

    default:
      return state;
  }
};

export default categoryReducer;
