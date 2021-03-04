import React from 'react';
import sprite from '../../img/sprite.svg';
import sprite_material from '../../img/sprite_material.svg';

export default function OrderReceipt() {
  return (
    <div className="page">
      <div className="container">
        <div className="order__receipt__wrapper">
          <div className="order__receipt__header__container">
            <div className="order__receipt__header__row">
              <div className="nav__link-icon-box">
                <svg className="icon">
                  <use href={sprite_material + '#icon-check'} />
                </svg>
              </div>
              <div className="order__receipt__header__title">
                <div className="order__receipt__header__title--text">
                  Your order has been placed.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
