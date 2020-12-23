import React from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import sprite from '../../img/sprite.svg';
import GoogleLogout from '../auth/GoogleoAUthLogout';
import DropMenu from './DropMenu';

const Navigation = (props) => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        {props.auth.isAuthenticated ? (
          <div className="nav__user">
            <li className="nav__item">
              <a href="/" className="nav__link">
                <svg className="nav__link-icon">
                  <use href={sprite + '#icon-home'} />
                </svg>
                home
              </a>
            </li>
            <li className="nav__item " id="drop-menu">
              <a href="/" className="nav__link">
                <svg className="nav__link-icon">
                  <use href={sprite + '#icon-menu'} />
                </svg>
                Details
              </a>
              <DropMenu />
            </li>
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
        {props.auth.isAuthenticated ? (
          <div className="nav__auth">
            <li className="nav__item--user">
              <div className="nav__auth-box">
                <div className="nav__img-box">
                  {/* CHECK IF USERS SIGNED WITH oAUTH2 */}
                  <img
                    src={
                      props.auth.user.avatar.startsWith('https://lh3')
                        ? `${props.auth.user.avatar}`
                        : `https://test-ecommerce-bucket-1.s3.amazonaws.com/avatars/${props.auth.user.avatar}`
                    }
                    alt="user img"
                    className="nav__img"
                  />
                </div>
                <span className="nav__auth--name">{props.auth.user.name}</span>
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
    </nav>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(Navigation));
