import React from 'react';

const DropMenu = () => {
  return (
    <div className="drop-menu">
      <ul className="drop-menu__list">
        <li className="drop-menu__item">
          <a href="#" className="drop-menu__link">
            Products
          </a>
        </li>
        <li className="drop-menu__item">
          <a href="#" className="drop-menu__link">
            Contacts
          </a>
        </li>
        <li className="drop-menu__item">
          <a href="#" className="drop-menu__link">
            Career
          </a>
        </li>
      </ul>
    </div>
  );
};
export default DropMenu;
