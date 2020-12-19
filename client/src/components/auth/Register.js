import React, { useState } from 'react';
import { signupUserAction } from '../../store/actions/authAction';
import { connect } from 'react-redux';
import sprite from '../../img/sprite.svg';

const Register = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const _submitForm = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password1,
      password2,
    };

    props.signupUserAction(data, props.history);
  };

  console.log('test', process.env.REACT_APP_GOOGLE_CLIENT_ID);

  return (
    <div className="register">
      <div className="register__container">
        <h2 className="register__heading">Register</h2>
        <form onSubmit={_submitForm} className="register__form">
          <div className="register__form-group">
            <label>
              <div className="register__form-label--name">name</div>
              <input
                type="text"
                name="name"
                className="register__form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
          </div>
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
                name="password1"
                className="register__form-input"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="register__form-group">
            <label>
              <div className="register__form-label--name">confirm</div>
              <input
                type="password"
                name="password2"
                className="register__form-input"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
              />
            </label>
          </div>
          <input type="submit" value="submit" className="btn" />
        </form>
        <button className="btn register__form-google-btn ">
          <svg className="nav__link-icon">
            <use href={sprite + '#icon-google-plus'} />
          </svg>
          Continue with Google
        </button>
        {/* HANDLE ERROR FROM API  */}
        {props.error ? (
          <div className="error">
            <span className="error--text">{props.error}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.error.error,
});

export default connect(mapStateToProps, { signupUserAction })(Register);
