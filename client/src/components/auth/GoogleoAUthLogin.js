// THIS COMPONENT PERFORMS SIGNIN AND LOGIN

import React from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import {
  signOauth2Action,
  loginOauth2Action,
} from '../../store/actions/authAction';
import { oAUth2GoogleRefreshToken } from '../../utils/oAUth2GoogleRefreshToken';

const GoogleoAUth = (props) => {
  ///////////////////////////////////////////
  const responseGoogle = (response) => {
    //SEPARATE FUNCTION
    oAUth2GoogleRefreshToken(response);
    // IN RESPONSE WE TAKE ONLY GOOGLE TOKEN

    if (!response.error) {
      const data = {
        tokenId: response.tokenId,
      };

      // IF USED AS SIGNUP or LOGIN
      if (props.signup) {
        props.signOauth2Action(data, props.history);
      } else if (props.login) {
        const data = {
          tokenId: response.tokenId,
        };
        props.loginOauth2Action(data, props.history);
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
  loginOauth2Action,
})(GoogleoAUth);
