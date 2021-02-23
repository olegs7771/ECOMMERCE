import React from 'react';
import { Image } from 'cloudinary-react';
import sprite_material from '../../img/sprite_material.svg';

export default function OrderProductItem({ item }) {
  //Total price for one product

  return (
    <div className="productlist__item__contents">
      {/* IMAGE  */}
      <div className="productlist__item__image-container">
        <Image
          cloudName="dyl4kpmie"
          publicId={item.product.images[0]}
          width="200"
          crop="scale"
          className="productlist__item__image-container--image "
        />
      </div>
      {/* INFORMATION GRID */}
      <div className="productlist__item__information-container">
        <ul className="productlist__item__information-container__list">
          <li className="productlist__item__information-container__list__title">
            <div className="productlist__item__information-container__list__title--title">
              {item.product.title}
            </div>
            <div className="productlist__item__information-container__list--quantity">
              x {item.quantity}
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
        <div className="productlist__item__information-container__prices">
          <div className="productlist__item__information-container__prices--price">
            $ {parseFloat(item.product.price * item.quantity)}
          </div>
        </div>
      </div>
    </div>
  );
}
