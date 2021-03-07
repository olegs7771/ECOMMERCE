import React from 'react';

export default function DashboardNav({ openModelOrders }) {
  return (
    <div className="dashboard__nav">
      <ul className="dashboard__nav__list">
        <li
          className="dashboard__nav__item dashboard__nav__item__orders"
          onClick={openModelOrders}
        >
          <a href="#!" className="dashboard__nav__link">
            My Orders
          </a>
        </li>
        <li className="dashboard__nav__item">
          <a href="#!" className="dashboard__nav__link">
            Orders
          </a>
        </li>
        <li className="dashboard__nav__item">
          <a href="#!" className="dashboard__nav__link">
            Orders
          </a>
        </li>
      </ul>
    </div>
  );
}
