import configureStore from '../store/configureStore/configStore';
import { setCurrentUser, clearOutUser } from '../store/actions/authAction';
import { setCookieAction } from '../store/actions/cookieAction';
import { getProductsFromCartAction } from '../store/actions/productAction';
import jwt_decode from 'jwt-decode';
const store = configureStore();

//gets either user or guest
export const reloadCart = (user, type) => {
  if (type === 'guest') {
    console.log('user in reload ', user);
    const data = { guestId: user };
    store.dispatch(getProductsFromCartAction(data));
  } else if (type === 'user') {
    console.log('user in reload ', user);
    const data = { userId: user };
    store.dispatch(getProductsFromCartAction(data));
  }
};

export const reload = (cookies) => {
  console.log('reload');

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
