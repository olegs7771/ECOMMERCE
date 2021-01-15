import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUserAction } from '../../store/actions/authAction';
import GoogleoAUthLogin from './GoogleoAUthLogin';
import ErrorMessageWithBtn from '../../utils/ErrorMessageWithBtn';
import { clearErrorReduxState } from '../../store/actions/categoryAction';
export default function Login(props) {
  // REDUX
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const errorRedux = useSelector((state) => state.error.errorMessage);
  const loading = useSelector((state) => state.loading.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const _submitLogin = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    dispatch(loginUserAction(data, props.history));
  };

  // GET ERROR TO STATE
  useEffect(() => {
    setError(errorRedux);
  }, [errorRedux]);

  // CLEAR ERROR IN REDUX
  const _clearErrorRedux = () => {
    dispatch(clearErrorReduxState());
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

          <input
            type="submit"
            value={loading ? 'wait..' : 'submit'}
            className="btn btn-auth"
          />
        </form>
        <GoogleoAUthLogin
          text="Login with Google"
          history={props.history}
          login={true}
        />
        {/* HANDLE ERROR FROM API  */}
        {error ? (
          <ErrorMessageWithBtn
            _clearReduxErrorState={_clearErrorRedux}
            errorState={error}
          />
        ) : null}
      </div>
    </div>
  );
}
