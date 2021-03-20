// HTTPS HTTP REQUESTS PUTS TOKEN TO EVERY REQUEST

import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //IN CASE THERE IS NO TOKEN
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
