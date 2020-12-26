import React from 'react';
import { connect } from 'react-redux';
import NavigationAdmin from './navigation/NavigationAdmin';

export const DashboardAdmin = (props) => {
  return (
    <div className="admin">
      {props.auth.isAuthenticated && props.auth.user.role === 'admin' ? (
        <div className="admin__container">
          <NavigationAdmin />
          <div className="admin__heading">Welcome Admin</div>
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
