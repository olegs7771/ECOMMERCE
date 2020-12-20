import React from 'react';
import { connect } from 'react-redux';
import { clearOutUser } from '../../store/actions/authAction';
import { withRouter } from 'react-router-dom';
import sprite from '../../img/sprite.svg';

const Navigation = (props) => {
  const _logotUser = () => {
    props.clearOutUser(); /// clear redux state
    localStorage.removeItem('jwtToken');
    props.history.push('/');
  };

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
            <li className="nav__item">
              <div className="nav__auth-box">
                <div className="nav__img-box">
                  CHECK IF USERS
                  <img
                    src={`https://test-ecommerce-bucket-1.s3.amazonaws.com/avatars/${props.auth.user.avatar}`}
                    alt="auth img"
                    className="nav__img"
                  />
                </div>
                <span className="nav__auth--name">{props.auth.user.name}</span>
              </div>
            </li>
            <li className="nav__item">
              <button className="btn" onClick={_logotUser}>
                Logout
              </button>
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

export default connect(mapStateToProps, { clearOutUser })(
  withRouter(Navigation)
);
