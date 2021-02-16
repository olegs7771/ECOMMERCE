import React from 'react';
import configureStore from './store/configureStore/configStore';
import { Provider } from 'react-redux';
import MainApp from './components/MainApp';
import './App.scss';

const store = configureStore();
const App = () => {
  // PREVENT SCROLL IF DRAWER ON

  console.log('document.body', (document.body.style.overflow = 'visible'));

  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
