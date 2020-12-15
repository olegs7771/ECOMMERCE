import React, { useState } from 'react';
import { connect } from 'react-redux';
import UploadAvatar from './UploadAvatar';
import { css } from '@emotion/core';
import ScaleLoader from 'react-spinners/ScaleLoader';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Profile = (props) => {
  const [openEditAvatar, setEditAvatar] = useState(false);

  if (props.auth.isAuthenticated) {
    return (
      <div className="profile">
        <h1 className="profile__heading">Profile</h1>

        {/* HANDLE ERROR FROM API  */}
        {props.error ? (
          <div className="error">
            <span className="error--text">{props.error}</span>
          </div>
        ) : null}

        <div className="profile__card-container">
          <div className="profile__card-container-elem">
            <span className="profile__card-container-lable">Name</span>
            <span className="profile__card-container-lable">Email</span>
            <span className="profile__card-container-lable">Role</span>
          </div>
          <div className="profile__card-container-elem">
            <span className="profile__card-container-lable">
              {props.auth.user.name}
            </span>
            <span className="profile__card-container-lable">
              {props.auth.user.email}
            </span>
            <span className="profile__card-container-lable">
              {props.auth.user.role}
            </span>
          </div>

          <div className="profile__card-container-elem  profile__image-block">
            <img
              src={`https://test-ecommerce-bucket-1.s3.amazonaws.com/avatars/hero_${props.auth.user.id}.jpg`}
              alt="hero user"
              className="profile__card-container--image"
            />
            <div className="profile__image-block--btn-group">
              <button
                className=" btn profile__image-block--btn-edit"
                onClick={() => setEditAvatar(true)}
              >
                Edit
              </button>
              <button
                className=" btn profile__image-block--btn-cancel"
                onClick={() => setEditAvatar(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {props.loading ? (
          <div className="loading">
            <ScaleLoader
              css={override}
              size={150}
              color={'#939090'}
              loading={props.loading}
            />
          </div>
        ) : (
          <UploadAvatar
            id={props.auth.user.id}
            history={props.history}
            message={props.message}
            open={openEditAvatar}
          />
        )}
      </div>
    );
  } else {
    return <div>Not Authorized to view this page!</div>;
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.loading.loading,
  message: state.message.message,
  error: state.error.error,
});

export default connect(mapStateToProps, {})(Profile);
