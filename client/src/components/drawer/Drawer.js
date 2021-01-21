import React from 'react';
import sprite from '../../img/sprite.svg';
import { useSelector, useDispatch } from 'react-redux';
import { drawerToggle } from '../../store/actions/drawerAction';
export default function Drawer({ open }) {
  const dispatch = useDispatch();

  const drawerRedux = useSelector((state) => state.drawer.drawer);

  return (
    <aside className={drawerRedux ? 'drawer drawer--open' : 'drawer '}>
      <div className="drawer__header">
        <div
          className="drawer__header-close"
          onClick={() => dispatch(drawerToggle(false))}
        >
          <div className="nav__link-icon-box">
            <svg className=" nav__link-icon">
              <use href={sprite + '#icon-cross'} />
            </svg>
          </div>
        </div>
      </div>
      <div className="drawer__container">
        <nav className="drawer__nav">
          <ul className="drawer__container">
            <li className="drawer__container-item">
              <a href="/admin/category" className="drawer__container-link">
                Categories
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
