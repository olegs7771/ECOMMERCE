// THIS COMPONENT PERFORMS SIGNIN AND LOGIN

import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import {
  signOauth2Action,
  loginUserAction,
} from '../../store/actions/authAction';

class GoogleoAUth extends Component {
  state = {
    data: {},
  };

  responseGoogle = (response) => {
    if (!response.error) {
      console.log('response', response.profileObj);
      const data = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        password1: response.profileObj.googleId,
        password2: response.profileObj.googleId,
        avatar: response.profileObj.imageUrl,
      };
      this.setState({
        data,
      });

      // IF USED AS SIGNUP or LOGIN
      if (this.props.signup) {
        this.props.signOauth2Action(this.state.data, this.props.history);
      } else if (this.props.login) {
        const data = {
          email: response.profileObj.email,
          password: response.profileObj.googleId,
        };
        this.props.loginUserAction(data, this.props.history);
      }
    }
  };

  render() {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText={this.props.text}
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    );
  }
}

export default connect(null, {
  signOauth2Action,
  loginUserAction,
})(GoogleoAUth);
