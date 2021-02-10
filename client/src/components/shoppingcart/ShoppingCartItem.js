import React from 'react';
import { Image } from 'cloudinary-react';

export default function ShoppingCartItem({ item }) {
  return (
    <div className="productlist__item">
      <div className="productlist__item__contents">
        {/* IMAGE  */}
        <div className="productlist__item__image-container">
          <Image
            cloudName="dyl4kpmie"
            publicId={item.images[0]}
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
                {item.title}
              </div>
            </li>
            <li className="productlist__item__information-container__list__brand">
              <div className="productlist__item__information-container__list__brand--brand">
                {item.brand}
              </div>
            </li>
            <li className="productlist__item__information-container__list__color">
              {item.color}
            </li>
          </ul>
          <div className="productlist__item__information-container__controls">
            <div className="productlist__item__information-container__controls__quantity">
              <div className="productlist__item__information-container__controls__quantity__dropdown">
                dorpdown
              </div>
            </div>
            <div className="productlist__item__information-container__controls__remove">
              <span className="productlist__item__information-container__controls__remove--remove">
                Remove product
              </span>
            </div>
          </div>
          <div className="productlist__item__information-container__prices">
            <div className="productlist__item__information-container__prices--price">
              $ {item.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
