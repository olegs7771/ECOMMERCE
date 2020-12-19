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

        <div className="profile__card">
          {/* PROFILE  */}
          <div className="profile__card-detail">
            <div className="profile__card-detail-block">
              <div className="profile__card-elem">
                <span className="profile__card-lable">Name</span>
                <span className="profile__card-lable">Email</span>
                <span className="profile__card-lable">Role</span>
              </div>
              <div className="profile__card-elem">
                <span className="profile__card-lable">
                  {props.auth.user.name}
                </span>
                <span className="profile__card-lable">
                  {props.auth.user.email}
                </span>
                <span className="profile__card-lable">
                  {props.auth.user.role}
                </span>
              </div>
            </div>
            <div className="profile__card-cta-block">
              <div className="profile__card-cta-block-btn-group">
                <button className="profile__card-cta-block-btn-group--edit btn">
                  Edit
                </button>
                <button className="profile__card-cta-block-btn-group--delete btn btn-delete">
                  Delete
                </button>
              </div>
            </div>
          </div>
          {/* AVATAR  */}
          <div className="profile__card-avatar">
            <div className="profile__card-avatar-image-block">
              <img
                src={`https://test-ecommerce-bucket-1.s3.amazonaws.com/avatars/${props.auth.user.avatar}`}
                alt="hero user"
                className="profile__card-avatar--image"
              />
            </div>
            <div className="profile__card-avatar-btn-group">
              <button
                className=" btn profile__card-avatar-btn-group--edit"
                onClick={() => setEditAvatar(true)}
              >
                Edit
              </button>
              <button
                className=" btn profile__image-block-btn--cancel"
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
