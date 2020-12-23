// THIS COMPONENT PERFORMS SIGNIN AND LOGIN

import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import {
  signOauth2Action,
  loginUserAction,
} from '../../store/actions/authAction';
import { oAUth2GoogleRefreshToken } from '../../utils/oAUth2GoogleRefreshToken';

const GoogleoAUth = (props) => {
  ///////////////////////////////////////////
  const responseGoogle = (response) => {
    oAUth2GoogleRefreshToken(response);

    console.log('response.tokenId', response.tokenId);
    if (!response.error) {
      console.log('response', response);
      console.log('response.profileObj', response.profileObj);
      const data = {
        name: response.profileObj.name,
        email: response.profileObj.email,
        password1: response.profileObj.googleId,
        password2: response.profileObj.googleId,
        avatar: response.profileObj.imageUrl,
        tokenId: response.tokenId,
      };

      // IF USED AS SIGNUP or LOGIN
      if (props.signup) {
        props.signOauth2Action(data, props.history);
      } else if (props.login) {
        const data = {
          email: response.profileObj.email,
          password: response.profileObj.googleId,
        };
        props.loginUserAction(data, props.history);
      }
    }
  };

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText={props.text}
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  );
};

export default connect(null, {
  signOauth2Action,
  loginUserAction,
})(GoogleoAUth);
