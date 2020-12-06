import React from 'react';

const Navigation = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <div className="nav__user">
          <li className="nav__item">
            <a href="#" className="nav__link">
              Home
            </a>
          </li>
          <li className="nav__item">
            <a href="#" className="nav__link">
              User
            </a>
          </li>
        </div>
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
      </ul>
    </nav>
  );
};

export default Navigation;
