import React from 'react';

const DropMenu = (props) => {
  return (
    <div className="drop-menu">
      <ul className="drop-menu__list">
        <li className="drop-menu__item">
          <a
            href={props.auth.user.role === 'admin' ? '/admin' : '/dashboard'}
            className="drop-menu__link"
          >
            Dashboard
          </a>
        </li>
        <li className="drop-menu__item">
          <a href="!#" className="drop-menu__link">
            Contacts
          </a>
        </li>
        <li className="drop-menu__item">
          <a href="!#" className="drop-menu__link">
            Career
          </a>
        </li>
      </ul>
    </div>
  );
};
export default DropMenu;
