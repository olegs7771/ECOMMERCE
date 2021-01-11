import React from 'react';
import { connect } from 'react-redux';
import sprite from '../../../img/sprite.svg';

export const DashboardAdmin = (props) => {
  return (
    <div className="admin">
      {props.auth.isAuthenticated && props.auth.user.role === 'admin' ? (
        <div className="admin__container">
          <div className="admin__statistic">
            {/* REGISTER USERS  */}
            <div className="admin__statistic-block admin__statistic-block--green">
              <div className="admin__statistic-block-detail">
                <div className="admin__statistic-block-detail--number">35</div>
                <div className="admin__statistic-block-detail--text">
                  Registered User
                </div>
              </div>
              <div className="admin__statistic-block-icon">
                <div className="admin__statistic-block-icon-box">
                  <svg className="admin__statistic-block-icon--register admin__statistic-block-icon--register--green">
                    <use href={sprite + '#icon-file-text2'} />
                  </svg>
                </div>
              </div>
            </div>
            {/* DAILY VISITORS  */}
            <div className="admin__statistic-block admin__statistic-block--orange">
              <div className="admin__statistic-block-detail">
                <div className="admin__statistic-block-detail--number">35</div>
                <div className="admin__statistic-block-detail--text">
                  Daily Visitor
                </div>
              </div>
              <div className="admin__statistic-block-icon">
                <div className="admin__statistic-block-icon-box ">
                  <svg className="admin__statistic-block-icon--register admin__statistic-block-icon--register--orange">
                    <use href={sprite + '#icon-eye'} />
                  </svg>
                </div>
              </div>
            </div>
            {/* NEW MESSAGES  */}
            <div className="admin__statistic-block admin__statistic-block--blue">
              <div className="admin__statistic-block-detail">
                <div className="admin__statistic-block-detail--number">35</div>
                <div className="admin__statistic-block-detail--text">
                  New Message
                </div>
              </div>
              <div className="admin__statistic-block-icon">
                <div className="admin__statistic-block-icon-box">
                  <svg className="admin__statistic-block-icon--register admin__statistic-block-icon--register--blue">
                    <use href={sprite + '#icon-mail2'} />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="admin__container">
          <div className="admin__heading">Access Denied ! Only for admin</div>
          <button className="btn">Login</button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(DashboardAdmin);
