import React from 'react';
import sprite from '../../img/sprite.svg';
import { useSelector, useDispatch } from 'react-redux';
import { drawerToggle } from '../../store/actions/drawerAction';
export default function Drawer() {
  const dispatch = useDispatch();

  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const auth = useSelector((state) => state.auth);

  return (
    <aside className={drawerRedux ? 'drawer drawer--open' : 'drawer '}>
      <div className="drawer__header">
        <div
          className="drawer__header-close"
          onClick={() => dispatch(drawerToggle(false))}
        >
          <div className="nav__link-icon-box">
            <svg className=" icon">
              <use href={sprite + '#icon-cross'} />
            </svg>
          </div>
        </div>
      </div>

      <div className="drawer__container">
        {!auth.isAuthenticated ? (
          // User
          <nav className="drawer__nav">
            <ul className="drawer__container">
              <li className="drawer__container-item">
                <a href="/category" className="drawer__container-link">
                  Categories
                </a>
              </li>
              <li className="drawer__container-item">
                <a href="/" className="drawer__container-link">
                  My Products
                </a>
              </li>
              <li className="drawer__container-item">
                <a href="/" className="drawer__container-link">
                  Contact Us
                </a>
              </li>
              <li className="drawer__container-item">
                <a href="/" className="drawer__container-link">
                  Other
                </a>
              </li>
            </ul>
          </nav>
        ) : (
          // ATHENTICATED
          <nav className="drawer__nav">
            {auth.user.role === 'admin' ? (
              <ul className="drawer__container">
                <li className="drawer__container-item">
                  <a href="/admin/category" className="drawer__container-link">
                    Categories Admin
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="drawer__container">
                <li className="drawer__container-item">
                  <a href="/admin/category" className="drawer__container-link">
                    Categories User Saved Products
                  </a>
                </li>
              </ul>
            )}
          </nav>
        )}
      </div>
    </aside>
  );
}
