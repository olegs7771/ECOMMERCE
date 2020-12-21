import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

export class GoogleoAUthLogout extends Component {
  state = {
    data: {},
  };

  logout = (response) => {
    console.log('google user logged out');
  };

  render() {
    return (
      <GoogleLogout
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={this.logout}
      />
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleoAUthLogout);
