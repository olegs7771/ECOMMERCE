import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { withRouter } from 'react-router-dom';
import sprite from '../../img/sprite.svg';
import GoogleLogout from '../auth/GoogleoAUthLogout';
import LeftDrawer from '../drawer/LeftDrawer';
import { drawerLeft } from '../../store/actions/drawerAction';

const Navigation = ({ history }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <div>
      <LeftDrawer />
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <div
              className="nav__link-icon-box"
              onClick={() => dispatch(drawerLeft(true))}
            >
              <svg className="nav__link-icon">
                <use href={sprite + '#icon-menu'} />
              </svg>
            </div>
          </li>

          {/* TOGGLE AUTH BLOCK  */}
          {auth.isAuthenticated ? (
            <div className="nav__auth">
              {/* SHOW ONLY IF ROLE ADMIN  */}
              {auth.user.role === 'admin' ? (
                <li className="nav__item nav__link-icon-box">
                  <a href="/admin" className="nav__link">
                    <svg className="nav__link-icon">
                      <use href={sprite + '#icon-user-tie'} />
                    </svg>
                  </a>
                </li>
              ) : null}
              <li className="nav__item ">
                <a href="/profile" className="nav__auth-box">
                  <div className="nav__img-box">
                    {/* CHECK IF USERS SIGNED WITH oAUTH2 */}
                    <img
                      src={
                        auth.user.avatar.startsWith('https://lh3')
                          ? `${auth.user.avatar}`
                          : `https://test-ecommerce-bucket-1.s3.amazonaws.com/avatars/${auth.user.avatar}`
                      }
                      alt="user img"
                      className="nav__img"
                    />
                  </div>
                  <span className="nav__auth--name">{auth.user.name}</span>
                </a>
              </li>

              <li className="nav__item">
                <GoogleLogout history={history} />
              </li>
            </div>
          ) : (
            <div className="nav__auth">
              <li className="nav__item">
                <a href="/login" className="nav__link">
                  <svg className="nav__link-icon">
                    <use href={sprite + '#icon-user'} />
                  </svg>
                  Login
                </a>
              </li>
              <li className="nav__item">
                <a href="/register" className="nav__link">
                  <svg className="nav__link-icon">
                    <use href={sprite + '#icon-user-plus'} />
                  </svg>
                  Register
                </a>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default withRouter(Navigation);
