import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { drawerToggle } from '../../store/actions/drawerAction';

export default function Dashboard(props) {
  // REDUX
  const dispatch = useDispatch();
  const drawerRedux = useSelector((state) => state.drawer.drawer);

  return (
    <div className="page dashboard">
      <div className="container">
        <div className="dashboard__wrapper">
          <div className="dashboard__nav">
            <ul className="dashboard__nav__list">
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
              <li className="dashboard__nav__item">
                <a href="#!" className="dashboard__nav__link">
                  Orders
                </a>
              </li>
            </ul>
          </div>
          <div className="dashboard__details">
            <ul className="dashboard__details__list">
              <li className="dashboard__details__item">
                <a href="#!" className="dashboard__details__link">
                  order date
                </a>
              </li>
              <li className="dashboard__details__item">
                <a href="#!" className="dashboard__details__link">
                  order date
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
