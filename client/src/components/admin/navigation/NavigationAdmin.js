import React from 'react';
import { connect } from 'react-redux';

export const NavigationAdmin = (props) => {
  return (
    <div className="admin__navigation">
      <ul className="admin__navigation-list">
        <li
          className={
            props.dashboard
              ? 'admin__navigation-item admin__navigation-item--active'
              : 'admin__navigation-item'
          }
        >
          <a href="/admin" className="admin__navigation-link">
            Dashboard
          </a>
        </li>
        <li
          className={
            props.product
              ? 'admin__navigation-item admin__navigation-item--active'
              : 'admin__navigation-item'
          }
        >
          <a href="!#!" className="admin__navigation-link">
            Product
          </a>
        </li>
        <li
          className={
            props.products
              ? 'admin__navigation-item admin__navigation-item--active'
              : 'admin__navigation-item'
          }
        >
          <a href="!#!" className="admin__navigation-link">
            Products
          </a>
        </li>
        <li
          className={
            props.category
              ? 'admin__navigation-item admin__navigation-item--active'
              : 'admin__navigation-item'
          }
        >
          <a href="/admin/category" className="admin__navigation-link">
            Category
          </a>
        </li>
        {/* <li
          className={
            props.sub
              ? 'admin__navigation-item admin__navigation-item--active'
              : 'admin__navigation-item'
          }
        >
          <a href="!#!" className="admin__navigation-link">
            Sub Category
          </a>
        </li> */}
        <li
          className={
            props.coupon
              ? 'admin__navigation-item admin__navigation-item--active'
              : 'admin__navigation-item'
          }
        >
          <a href="!#" className="admin__navigation-link">
            Coupon
          </a>
        </li>
        <li
          className={
            props.password
              ? 'admin__navigation-item admin__navigation-item--active'
              : 'admin__navigation-item'
          }
        >
          <a href="!#!" className="admin__navigation-link">
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
