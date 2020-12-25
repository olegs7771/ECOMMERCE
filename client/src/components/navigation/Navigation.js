import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import sprite from '../../img/sprite.svg';
import GoogleLogout from '../auth/GoogleoAUthLogout';
import DropMenu from './DropMenu';

class Navigation extends Component {
  render() {
    return (
      <nav className="nav">
        <ul className="nav__list">
          {this.props.auth.isAuthenticated ? (
            <div className="nav__user">
              <li className="nav__item">
                <a href="/" className="nav__link">
                  <svg className="nav__link-icon">
                    <use href={sprite + '#icon-home'} />
                  </svg>
                  home
                </a>
              </li>
              <div className="nav__item " id="drop-menu">
                <svg className="nav__link-icon">
                  <use href={sprite + '#icon-menu'} />
                </svg>
                <span className="nav__link">Details</span>
                <DropMenu />
              </div>
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
          {this.props.auth.isAuthenticated ? (
            <div className="nav__auth">
              {/* SHOW ONLY IF ROLE ADMIN  */}
              {this.props.auth.user.role === 'admin' ? (
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
                        this.props.auth.user.avatar.startsWith('https://lh3')
                          ? `${this.props.auth.user.avatar}`
                          : `https://test-ecommerce-bucket-1.s3.amazonaws.com/avatars/${this.props.auth.user.avatar}`
                      }
                      alt="user img"
                      className="nav__img"
                    />
                  </div>
                  <span className="nav__auth--name">
                    {this.props.auth.user.name}
                  </span>
                </div>
              </li>

              <li className="nav__item">
                <GoogleLogout history={this.props.history} />
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
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(withRouter(Navigation));
