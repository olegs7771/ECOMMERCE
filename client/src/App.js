import React from 'react';
import { withCookies } from 'react-cookie';
import MainApp from './components/MainApp';
import axios from 'axios';
import { reload } from './utils/reloadUserAuth';
import './App.scss';
import { Provider } from 'react-redux';

const App = (props) => {
  const store = reload(props.allCookies); //ON EVERY RELOAD RESET AUTH USER REDUX STATE
  // IF sessionId expired or cleared fetch new guest token and userId
  if (!props.allCookies.sessionId) {
    const fetchUserId = async () => {
      try {
        await axios.get('/api/v1/users');
        // console.log('res.data fetchUserId', res.data);
      } catch (error) {
        console.log('error fetchUserId', error.response.data);
      }
    };
    fetchUserId();
  }

  return (
    <Provider store={store}>
      <MainApp cookies={props} />
    </Provider>
  );
};

export default withCookies(App);
