import React from 'react';
import { connect } from 'react-redux';

const Profile = (props) => {
  if (props.auth.isAuthenticated) {
    return (
      <div className="profile">
        <h1 className="profile__heading">Profile</h1>
        <div className="profile__card-container">
          <div className="profile__card-container--left">
            <span className="profile__card-container-lable">Name</span>
            <span className="profile__card-container-lable">Email</span>
            <span className="profile__card-container-lable">Role</span>
          </div>
          <div className="profile__card-container--right">
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
          <div className="profile__card-container--right">
            <img
              src={
                'https://ecommmerce.s3.amazonaws.com/hero_5fd39c009e1ae53a545b80ca.jpg'
              }
              alt="hero user"
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading..</div>;
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Profile);
