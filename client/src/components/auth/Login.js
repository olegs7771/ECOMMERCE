import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loginUserAction } from '../../store/actions/authAction';

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
        <form onSubmit={_submitLogin} className="register__form">
          <div className="register__form-group">
            <label>
              <div className="register__form-label--name">email</div>
              <input
                type="email"
                name="email"
                className="register__form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="register__form-group">
            <label>
              <div className="register__form-label--name">password</div>
              <input
                type="password"
                name="password"
                className="register__form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>

          <input type="submit" value="submit" className="btn btn-auth" />
        </form>
      </div>
    </div>
  );
};

const setStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(setStateToProps, { loginUserAction })(Login);
