import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { confirmUser } from '../../store/actions/authAction';

const Confirmation = (props) => {
  //  RECEIVING PARAMS
  const id = props.match.params.id;
  const token = props.match.params.token;

  const data = { id, token };
  const confirm = () => {
    return props.confirmUser(data);
  };

  useEffect(() => {
    confirm();
  }, []);

  return (
    <div className="confirmation">
      <div className="confirmation__heading-container">
        {props.loading ? (
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
      {props.message ? (
        <div className="confirmation__message">
          <div className="message">
            <p className="message--text">{props.message}</p>
          </div>
        </div>
      ) : null}
      {/* HANDLE ERROR FROM API  */}
      {props.error ? (
        <div className="error">
          <span className="error--text">{props.error.message}</span>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.loading.loading,
  message: state.message.message,
  error: state.error.error,
});

export default connect(mapStateToProps, { confirmUser })(Confirmation);
