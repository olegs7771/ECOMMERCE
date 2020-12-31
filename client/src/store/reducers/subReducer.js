import { GET_SUB_LIST } from '../actions/types';
const initialState = {
  subs: [],
};
const subReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUB_LIST:
      return {
        ...state,
        subs: action.payload,
      };

    default:
      return state;
  }
};

export default subReducer;
