import React, { useState, useEffect } from 'react';
import {
  signupUserAction,
  checkEmailExists,
} from '../../store/actions/authAction';
import { useSelector, useDispatch } from 'react-redux';
// import sprite from '../../img/sprite.svg';
import GoogleoAUthLogin from './GoogleoAUthLogin';

import { clearErrorReduxState } from '../../store/actions/categoryAction';
import TextInputForm from '../../utils/TextInputForm';

export default function Register(props) {
  // REDUX
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const errorsRedux = useSelector((state) => state.error.errors);
  const messageRedux = useSelector((state) => state.message.message);

  const loading = useSelector((state) => state.loading.loading);

  const initialState = {
    user: '',
    email: '',
    password1: '',
    password2: '',
  };

  const [values, setValue] = useState(initialState);
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({}); //errors object

  const _onChange = (e) => {
    //CHECK IF EMAIL EXISTS ONFLY

    if (e.target.name === 'email') {
      if (e.target.value.length > 8) {
        const data = {
          email: e.target.value,
        };
        dispatch(checkEmailExists(data));
      }
    }

    setValue({ ...values, [e.target.name]: e.target.value });
    if (!errors.email) {
      _clearErrorRedux();
    }
  };

  const _submitForm = (e) => {
    e.preventDefault();

    dispatch(signupUserAction(values, props.history));
  };

  // GET ERRORS TO STATE
  useEffect(() => {
    setErrors(errorsRedux);
  }, [errorsRedux]);

  // GET MESSAGE TO STATE
  useEffect(() => {
    setMessage(messageRedux);
  }, [messageRedux]);

  // CLEAR ERROR IN REDUX
  const _clearErrorRedux = () => {
    dispatch(clearErrorReduxState());
  };

  return (
    <div className="register">
      {/* API MESSAGE ON SUCCESS SIGN UP  */}
      {message ? (
        <div className="register__message">
          <div className=" message">
            <span className="message--text">{message}</span>
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
          <h2 className="register__heading ">Register</h2>
          <form onSubmit={_submitForm} className="form">
            <TextInputForm
              error={errors.user}
              value={values.user}
              _onChange={_onChange}
              label="name"
              type="text"
              name="user"
              placeholder="John Brown.."
            />
            <TextInputForm
              error={errors.email}
              value={values.email}
              _onChange={_onChange}
              label="name"
              type="email"
              name="email"
              placeholder="example@mail.com"
            />
            <TextInputForm
              error={errors.password}
              value={values.password1}
              _onChange={_onChange}
              label="password"
              type="password"
              name="password1"
            />
            <TextInputForm
              error={errors.confirm}
              value={values.password2}
              _onChange={_onChange}
              label="password"
              type="password"
              name="password2"
            />

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
        </div>
      )}
    </div>
  );
}
