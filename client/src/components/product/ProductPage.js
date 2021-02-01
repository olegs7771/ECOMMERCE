import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import sprite from '../../img/sprite.svg';

export default function ProductPage({ image, title, price, brand }) {
  const [focused, setFocused] = useState(false);

  const _onFocusIn = () => {
    setFocused(true);
  };
  const _onFocusOut = () => {
    setFocused(false);
  };
  return (
    <div
      className="pub-category__p-card"
      onMouseEnter={_onFocusIn}
      onMouseLeave={_onFocusOut}
    >
      {/* <img src={image} alt="product" className="pub-category__p-card--img" /> */}
      <Image
        cloudName="dyl4kpmie"
        publicId={image}
        width="350"
        crop="scale"
        className="pub-category__p-card--image "
        // onClick={showLargeImage.bind(this, image)}
      />

      <div className="pub-category__p-card__bottom">
        {/* Product card BOTTOM LEFT */}
        <div className="pub-category__p-card__details">
          <div
            className={
              focused
                ? 'pub-category__p-card__details--name-visible'
                : 'pub-category__p-card__details--name'
            }
          >
            {title}
          </div>
          <div className="pub-category__p-card__details--brand">{brand}</div>
          <div className="pub-category__p-card__details__price">
            <span className="pub-category__p-card__details__price--simbol">
              $
            </span>
            <span className="pub-category__p-card__details__price--integer">
              {price.substring(-3, 2)}
            </span>
            <span className="pub-category__p-card__details__price--decimals">
              {price.substring(price.length - 3)}
            </span>
          </div>
        </div>
        {/*  Product card BOTTOM RIGHT */}

        <div className="pub-category__p-card__cart ">
          <div
            className={
              focused
                ? 'nav__link-icon-box pub-category__p-card__cart--visible'
                : 'nav__link-icon-box pub-category__p-card__cart--icon'
            }
          >
            <svg className="icon">
              <use href={sprite + '#icon-cart'} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
