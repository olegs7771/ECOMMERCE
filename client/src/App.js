import React from 'react';
// import { withCookies } from 'react-cookie';
import MainApp from './components/MainApp';
// import axios from 'axios';
// import { reload } from './utils/reloadUserAuth';
import './App.scss';
// import { Provider } from 'react-redux';

const App = (props) => {
  // const store = reload(props.allCookies); //ON EVERY RELOAD RESET AUTH USER REDUX STATE
  // // IF sessionId expired or cleared fetch new guest token and userId
  // if (!props.allCookies.sessionId) {
  //   const fetchUserId = async () => {
  //     try {
  //       const res = await axios.get('/api/v1/users');
  //       console.log('res.data fetchUserId', res.data);
  //     } catch (error) {
  //       console.log('error fetchUserId', error.response.data);
  //     }
  //   };
  //   fetchUserId();
  // }
  // IF PRODUCTS IN SHOPPINGCART FETCH CART ON EVERY RELOAD FOR GUEST IN COOKIES
  // if (Object.keys(props.allCookies).some((el) => el.startsWith('productId'))) {
  //   console.log('products in cart');
  //   reloadCart(props.allCookies.guestId);
  // }

  return (
    // <Provider store={store}>
    //   <MainApp cookies={props} />
    // </Provider>
    // <Provider>
    // <MainApp cookies={props} />
    <MainApp />
    // </Provider>
  );
};

// export default withCookies(App);
export default App;
