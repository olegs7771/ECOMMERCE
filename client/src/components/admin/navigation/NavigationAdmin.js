import React from 'react';
import { connect } from 'react-redux';

export const NavigationAdmin = (props) => {
  return (
    <div className="admin__navigation">
      <ul className="admin__navigation-list">
        <li className="admin__navigation-item">
          <a href="#" className="admin__navigation-link">
            Product
          </a>
        </li>
        <li className="admin__navigation-item">
          <a href="#" className="admin__navigation-link">
            Products
          </a>
        </li>
        <li className="admin__navigation-item">
          <a href="/admin/category" className="admin__navigation-link">
            Category
          </a>
        </li>
        <li className="admin__navigation-item">
          <a href="#" className="admin__navigation-link">
            Sub Category
          </a>
        </li>
        <li className="admin__navigation-item">
          <a href="#" className="admin__navigation-link">
            Coupon
          </a>
        </li>
        <li className="admin__navigation-item">
          <a href="#" className="admin__navigation-link">
            Password
          </a>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationAdmin);
