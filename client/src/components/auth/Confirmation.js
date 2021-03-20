import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { confirmUser } from '../../store/actions/authAction';
import ErrorMessageWithBtn from '../../utils/ErrorMessageWithBtn';
import { clearErrorReduxState } from '../../store/actions/categoryAction';
export default function Confirmation(props) {
  //  RECEIVING PARAMS

  // REDUX
  const dispatch = useDispatch();

  const errorRedux = useSelector((state) => state.error.errorMessage);
  const messageRedux = useSelector((state) => state.message.message);
  const loading = useSelector((state) => state.loading.loading);
  // STATE
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // SEND TO API TO COMPLETE REGISTRATION

  useEffect(() => {
    dispatch(
      confirmUser({
        id: props.match.params.id,
        token: props.match.params.token,
      })
    );
  }, [dispatch, props.match.params.id, props.match.params.token]);

  // GET ERROR MESSAGE TO STATE
  useEffect(() => {
    setError(errorRedux);
  }, [errorRedux]);

  // GET  MESSAGE TO STATE
  useEffect(() => {
    setMessage(messageRedux);
  }, [messageRedux]);

  const _clearError = () => {
    dispatch(clearErrorReduxState());
    props.history.push('/');
  };

  return (
    <div className="confirmation">
      <div className="confirmation__heading-container">
        {loading ? (
          <div className="confirmation__heading confirmation__heading--loading">
            <p className="confirmation__heading-text">Processing.. </p>
            <div className="confirmation__heading--animation-line"></div>
          </div>
        ) : (
          <div className="confirmation__heading">
            <p className="confirmation__heading-text">registration </p>
            <p className="confirmation__heading-text">completed</p>
          </div>
        )}
      </div>
      {/* HANDLE MESSAGE FROM API  */}
      {message ? (
        <div className="confirmation__message">
          <div className="message">
            <p className="message--text">{message}</p>
          </div>
          <button className="btn" onClick={() => props.history.push('/')}>
            ok
          </button>
        </div>
      ) : null}
      {/* HANDLE ERROR FROM API  */}
      {error ? (
        <ErrorMessageWithBtn
          errorState={error.message}
          _clearReduxErrorState={_clearError}
        />
      ) : null}
    </div>
  );
}
