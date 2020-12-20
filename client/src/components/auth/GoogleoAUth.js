import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { googleOAUth2, signupUserAction } from '../../store/actions/authAction';

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

      this.props.signupUserAction(this.state.data, this.props.history);
    }
  };

  render() {
    return (
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    );
  }
}

export default connect(null, { googleOAUth2, signupUserAction })(GoogleoAUth);
