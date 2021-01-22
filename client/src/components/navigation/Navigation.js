import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { withRouter } from 'react-router-dom';
import sprite from '../../img/sprite.svg';
import GoogleLogout from '../auth/GoogleoAUthLogout';
import Drawer from '../drawer/Drawer';
import { drawerToggle } from '../../store/actions/drawerAction';

const Navigation = ({ history }) => {
  // REDUX
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  // STATE
  const [drawer, setDrawer] = useState(false);

  // SET DRAWER REDUX IN STATE
  useEffect(() => {
    setDrawer(drawerRedux);
  }, [drawerRedux]);

  const _drawerToggle = () => {
    setDrawer(!drawer);
  };
  useEffect(() => {
    dispatch(drawerToggle(drawer));
  }, [dispatch, drawer]);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__container__inner">
          <Drawer />
          <nav className="nav ">
            <ul className="nav__list">
              <li className="nav__item">
                <div className="nav__link-icon-box" onClick={_drawerToggle}>
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
                      Sign In
                    </a>
                  </li>
                  <li className="nav__item">
                    <a href="/register" className="nav__link">
                      <svg className="nav__link-icon">
                        <use href={sprite + '#icon-user-plus'} />
                      </svg>
                      Sign Up
                    </a>
                  </li>
                </div>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default withRouter(Navigation);
