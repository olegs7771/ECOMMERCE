import React, { useState, useEffect } from 'react';
import { signupUserAction } from '../../store/actions/authAction';
import { useSelector, useDispatch } from 'react-redux';
// import sprite from '../../img/sprite.svg';
import GoogleoAUthLogin from './GoogleoAUthLogin';
import ErrorMessageWithBtn from '../../utils/ErrorMessageWithBtn';
import { clearErrorReduxState } from '../../store/actions/categoryAction';
import TextInputForm from '../../utils/TextInputForm';

export default function Register(props) {
  // REDUX
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const errorsRedux = useSelector((state) => state.error.errors);
  const errorRedux = useSelector((state) => state.error.errorMessage);
  const loading = useSelector((state) => state.loading.loading);

  const initialState = {
    user: '',
    email: '',
    password1: '',
    password2: '',
  };

  const [values, setValue] = useState(initialState);

  const _onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
    setErrors({});
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [errors, setErrors] = useState(null); //errors object
  const [error, setError] = useState(null); //error message single

  const onChange = (e) => {};

  const _submitForm = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password1,
      password2,
    };

    dispatch(signupUserAction(data, props.history));
  };

  // GET ERROR TO STATE
  useEffect(() => {
    setErrors(errorRedux);
  }, [errorRedux]);

  // GET ERRORS TO STATE
  useEffect(() => {
    setErrors(errorsRedux);
  }, [errorsRedux]);

  // CLEAR ERROR IN REDUX
  const _clearErrorRedux = () => {
    dispatch(clearErrorReduxState());
  };

  return (
    <div className="register">
      {/* API MESSAGE ON SUCCESS SIGN UP  */}
      {props.message ? (
        <div className="register__message">
          <div className=" message">
            <span className="message--text">{props.message}</span>
          </div>
          <button
            className="btn register__btn"
            onClick={() => props.history.push('/')}
          >
            Ok
          </button>
        </div>
      ) : (
        <div className="register__container">
          <h2 className="register__heading">Register</h2>
          <form onSubmit={_submitForm} className="form">
            <TextInputForm
              error={errors.user}
              value={name}
              _onChange={_onChange}
              // _checkField={_checkField}
              label="nmae"
              type="text"
              name="name"
              placeholder="John Brown.."
            />
            {/* <div className="form-group">
              <label>
                <div className="form-label--name">name</div>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
            </div> */}
            <div className="form-group">
              <label>
                <div className="form-label--name">email</div>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={email}
                  onChange={_onChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                <div className="form-label--name">password</div>
                <input
                  type="password"
                  name="password1"
                  className="form-input"
                  value={password1}
                  onChange={_onChange}
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label>
                <div className="form-label--name">confirm</div>
                <input
                  type="password"
                  name="password2"
                  className="form-input"
                  value={password2}
                  onChange={_onChange}
                  required
                />
              </label>
            </div>
            <input
              type="submit"
              value={props.loading ? 'Proccessing..' : 'submit'}
              className="btn"
            />
          </form>

          <GoogleoAUthLogin
            history={props.history}
            text="Sign up with Google"
            signup={true}
          />

          {/* HANDLE ERROR FROM API  */}
          {error ? (
            <ErrorMessageWithBtn
              _clearReduxErrorState={_clearErrorRedux}
              errorState={error}
            />
          ) : null}
        </div>
      )}
    </div>
  );
}
