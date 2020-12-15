import React from 'react';
import { connect } from 'react-redux';
import { clearOutUser } from '../../store/actions/authAction';
import { withRouter } from 'react-router-dom';

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
                Home
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
                  <img
                    src={`https://test-ecommerce-bucket-1.s3.amazonaws.com/avatars/hero_${props.auth.user.id}.jpg`}
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
                Login
              </a>
            </li>
            <li className="nav__item">
              <a href="/register" className="nav__link">
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
