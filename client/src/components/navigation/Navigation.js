import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';
import sprite from '../../img/sprite.svg';
import GoogleLogout from '../auth/GoogleoAUthLogout';
import DropMenu from './DropMenu';

const Navigation = (props) => {
  const auth = useSelector((state) => state.auth);
  const [showDropMenu, setShowDropMenu] = useState(false);

  const _showDrop = () => {
    setShowDropMenu(!showDropMenu);
  };

  return (
    <nav className="nav">
      <ul className="nav__list">
        {auth.isAuthenticated ? (
          <div className="nav__user">
            <li className="nav__item">
              <a
                href={auth.user.role === 'admin' ? '/admin' : '/dashboard'}
                className="nav__link"
              >
                <svg className="nav__link-icon">
                  <use href={sprite + '#icon-home'} />
                </svg>
                home
              </a>
            </li>

            {/* DROP MENU  */}
            <div className="nav__item-group">
              <li className="nav__item--menu " onClick={_showDrop}>
                <span className="nav__link"> Menu</span>
              </li>
              <svg className="nav__link-icon--arrowdown">
                {showDropMenu ? (
                  <use href={sprite + '#icon-arrow-down2'} />
                ) : (
                  <use href={sprite + '#icon-arrow-down2'} />
                )}
              </svg>
            </div>
            {/* /////////////////////////////////// */}

            <li className="nav__item">
              <a href="/profile" className="nav__link">
                User
              </a>
            </li>
          </div>
        ) : (
          <div className="nav__user">
            <li className="nav__item">
              <a href="/" className="nav__link">
                <svg className="nav__link-icon">
                  <use href={sprite + '#icon-home'} />
                </svg>
                Home
              </a>
            </li>
          </div>
        )}

        {/* TOGGLE AUTH BLOCK  */}
        {auth.isAuthenticated ? (
          <div className="nav__auth">
            {/* SHOW ONLY IF ROLE ADMIN  */}
            {auth.user.role === 'admin' ? (
              <li className="nav__item">
                <a href="/dashboard-admin" className="nav__link">
                  <svg className="nav__link-icon">
                    <use href={sprite + '#icon-user-tie'} />
                  </svg>
                  Admin
                </a>
              </li>
            ) : null}
            <li className="nav__item">
              <div className="nav__auth-box">
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
              </div>
            </li>

            <li className="nav__item">
              <GoogleLogout history={props.history} />
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
      <DropMenu auth={auth} open={showDropMenu} />
    </nav>
  );
};

export default withRouter(Navigation);
