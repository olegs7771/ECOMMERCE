import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUserAction } from '../../store/actions/authAction';
import GoogleoAUthLogin from './GoogleoAUthLogin';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const _submitLogin = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    props.loginUserAction(data, props.history);
  };

  return (
    <div className="register">
      <div className="register__container">
        <h2 className="register__heading">Login</h2>
        <form onSubmit={_submitLogin} className="form">
          <div className="form-group">
            <label>
              <div className="form-label--name">email</div>
              <input
                type="email"
                name="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label--name">password</div>
              <input
                type="password"
                name="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>

          <input type="submit" value="submit" className="btn btn-auth" />
        </form>
        <GoogleoAUthLogin
          text="Login with Google"
          history={props.history}
          login={true}
        />
        {/* HANDLE ERROR FROM API  */}
        {props.error ? (
          <div className="error">
            <span className="error--text">{props.error.message}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const setStateToProps = (state) => ({
  auth: state.auth,
  error: state.error.error,
});

export default connect(setStateToProps, { loginUserAction })(Login);
