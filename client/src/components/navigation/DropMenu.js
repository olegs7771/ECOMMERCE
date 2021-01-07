import React from 'react';

const DropMenu = ({ open }) => {
  return (
    <div className={open ? 'drop-menu drop-menu--open' : 'drop-menu'}>
      <ul className="drop-menu__list">
        <li className="drop-menu__item">
          <a href="!#" className="drop-menu__link">
            Item
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
