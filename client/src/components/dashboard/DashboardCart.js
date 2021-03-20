import React from 'react';
import { Image } from 'cloudinary-react';
// import sprite_material from '../../img/sprite_material.svg';

export default function DashboardCart({ item }) {
  //Total price for one product

  return (
    <div className="productlist__item__contents dashboard__cart__content">
      {/* IMAGE  */}
      <div className=" dashboard__cart__image__container">
        <Image
          cloudName="dyl4kpmie"
          publicId={item.product.images[0]}
          width="200"
          crop="scale"
          className="productlist__item__image-container--image "
        />
      </div>
      {/* INFORMATION GRID */}

      <div className=" dashboard__cart">
        <ul className=" dashboard__list">
          <li className="dashboard__list__title">
            <div className="dashboard__list__title--title">
              {item.product.title}
            </div>
            <div className="productlist__item__information-container__list--quantity">
              <span>x</span> <span>{item.quantity}</span>
            </div>
          </li>
          <li className="productlist__item__information-container__list__brand">
            <div className="productlist__item__information-container__list__brand--brand">
              {item.product.brand}
            </div>
          </li>
          <li className="productlist__item__information-container__list__color">
            {item.product.color}
          </li>
        </ul>
        <div className="productlist__item__information-container__controls">
          <div className="productlist__item__information-container__controls__quantity"></div>
        </div>
        {/* PRICE  */}
        <div className="dashboard__price">
          <div className="dashboard__price--price">
            $ {parseFloat(item.product.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
