import { GOOGLE_OAUTH2 } from '../actions/types';

const initialState = {
  googleOauth2: [],
};
const googleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOOGLE_OAUTH2:
      return {
        ...state,
        googleOauth2: action.payload,
      };

    default:
      return state;
  }
};
export default googleReducer;
