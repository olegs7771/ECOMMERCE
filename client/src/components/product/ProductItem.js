import React, { useState } from 'react';
import { Image } from 'cloudinary-react';
import sprite from '../../img/sprite.svg';

export default function ProductItem({
  image,
  title,
  price,
  brand,
  productId,
  slug,
  categoryId,
  categorySlug,
  history,
}) {
  const [focused, setFocused] = useState(false);

  const _onFocusIn = () => {
    setFocused(true);
  };
  const _onFocusOut = () => {
    setFocused(false);
  };

  // GET ONE PRODUCT PAGE
  const _getProduct = (e) => {
    console.log('product e', e);
    history.push(`/product/${e[0]}/${e[1]}/${categoryId}/${categorySlug}`);
  };

  return (
    <div
      className="pub-category__p-card"
      onMouseEnter={_onFocusIn}
      onMouseLeave={_onFocusOut}
      onClick={_getProduct.bind(this, [productId, slug])}
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
          {/* NAME  */}
          <div
            className={
              focused
                ? 'pub-category__p-card__details--name-visible'
                : 'pub-category__p-card__details--name'
            }
          >
            {title}
          </div>
          {/* BRAND  */}
          <div className="pub-category__p-card__details--brand">{brand}</div>
          {/* PRICE  */}
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
          {/* RATING  */}
          <div className="pub-category__p-card__details__rating">
            <span className="pub-category__p-card__details__rating__bar">
              <svg className="icon">
                <use href={sprite + '#icon-star-full'} />
              </svg>
              <svg className="icon">
                <use href={sprite + '#icon-star-half'} />
              </svg>
              <svg className="icon">
                <use href={sprite + '#icon-star-empty'} />
              </svg>
            </span>
            <div className="pub-category__p-card__details__rating__reviews">
              <span>(</span>
              <span className="pub-category__p-card__details__rating__reviews--amount">
                30
              </span>
              <span>)</span>
            </div>
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
