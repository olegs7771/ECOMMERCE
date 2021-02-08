import configureStore from '../store/configureStore/configStore';
import { setCurrentUser, clearOutUser } from '../store/actions/authAction';
import { setCookieAction } from '../store/actions/cookieAction';
import jwt_decode from 'jwt-decode';
const store = configureStore();

export const reload = (cookies) => {
  // SET COOKIES IN STATE
  store.dispatch(setCookieAction(cookies));

  if (localStorage.jwtToken) {
    //decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    //set currentUser to auth.user in redux state and  Authenticate for reloads
    const dataToRedux = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
      avatar: decoded.avatar,
    };
    store.dispatch(setCurrentUser(dataToRedux));
    const timeNow = parseInt(Date.now() / 1000, 10);
    if (decoded.exp < timeNow) {
      store.dispatch(clearOutUser());
    }
  }
  return store;
};
