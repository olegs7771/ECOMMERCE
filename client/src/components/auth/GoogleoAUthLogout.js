// THIS COMPONENT LOGOUT GOOGLE USER AND SERVE AS LOGOUT BUTTON FOR APP

import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import {
  clearOutUser,
  clearCookiesAction,
} from '../../store/actions/authAction';

class GoogleoAUthLogout extends Component {
  render() {
    const responseLogout = () => {
      this.props.clearOutUser();
      this.props.clearCookiesAction();
      localStorage.removeItem('jwtToken');

      this.props.history.push('/');
    };

    return (
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={responseLogout}
        icon={false}
      />
    );
  }
}

export default connect(null, { clearOutUser, clearCookiesAction })(
  GoogleoAUthLogout
);
