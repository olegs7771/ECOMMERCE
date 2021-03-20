import React from 'react';
import sprite from '../img/sprite.svg';
export default function ModalSlideToLeft({ modal, body, title }) {
  return (
    <div
      className={
        modal ? 'modal__wrapper' : 'modal__wrapper modal__wrapper--close'
      }
    >
      <div
        className={
          modal
            ? 'modal__wrapper__backdrop'
            : 'modal__wrapper__backdrop modal__wrapper__backdrop--close'
        }
      ></div>
      <div
        className={
          modal ? 'modal__sheets modal__sheets--open' : 'modal__sheets'
        }
      >
        <div className="modal__sheets__header">
          <div className="nav__link-icon-box">
            <svg className="icon">
              <use href={sprite + '#icon-cross'} />
            </svg>
          </div>
          <div className="modal__sheets__header__title__wrapper">
            <span className="modal__sheets__header__title__wrapper--text">
              {title}
            </span>
          </div>
          <div className="nav__link-icon-box">
            <svg className="icon ">
              <use href={sprite + '#icon-arrow-left2'} />
            </svg>
          </div>
        </div>
        {/* SHOW MODAL WITH A BODY IN SHOPPINGCART  */}
        <div className="modal__sheets__content">{body}</div>
      </div>
    </div>
  );
}
