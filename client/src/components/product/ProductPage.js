import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../navigation/BreadCrumbs';
import { Image } from 'cloudinary-react';
import { drawerToggle } from '../../store/actions/drawerAction';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOneProduct,
  getProductInCartAction,
} from '../../store/actions/productAction';
// import no_image from '../../img/no_image.png';
import { Spinner } from '../../utils/LoadingComponent';
import sprite from '../../img/sprite.svg';
import sprite_material from '../../img/sprite_material.svg';
export default function ProductPage(props) {
  // REDUX
  const dispatch = useDispatch();
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const loadingRedux = useSelector((state) => state.loading.loading);
  const productRedux = useSelector((state) => state.product.product);
  // STATE
  const [favorite, setFavorite] = useState(false);

  // LOAD PRODUCT ON LOAD
  useEffect(() => {
    dispatch(
      getOneProduct({
        productId: props.match.params.productId,
        slug: props.match.params.slug,
      })
    );
  }, [dispatch, props.match.params.productId, props.match.params.slug]);

  // CLICK ON FAVORITE
  const _setFav = () => {
    setFavorite(!favorite);
  };
  // ADD PRODUCT TO SHOPPING CART
  const _addProductToCart = (e) => {
    console.log('_addProductToCar e', e);
    dispatch(getProductInCartAction({ slug: e }));
  };

  return (
    <div className="pub-product page">
      <div
        className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
        onClick={() => dispatch(drawerToggle(false))}
      ></div>
      <div className="pub-product__container container">
        <BreadCrumbs
          href1="/"
          link1="Home"
          href2="/category "
          link2="category"
          href3={`/category/${props.match.params.categorySlug}/${props.match.params.categoryId}`}
          link3={props.match.params.categorySlug}
          current={props.match.params.slug}
        />
        {loadingRedux || !productRedux ? (
          <Spinner loading={true} />
        ) : (
          <div className="pub-product__wrapper">
            <div className="pub-product__gallery">
              {productRedux.images.length === 0 && (
                <div className="heading-3 mb-sm">No Images</div>
              )}
              <div className="pub-product__gallery__block">
                {productRedux.images.map((image, index) => (
                  <figure className="pub-product__gallery__item" key={index}>
                    <Image
                      cloudName="dyl4kpmie"
                      publicId={image}
                      width="400"
                      crop="scale"
                      className="pub-product__gallery--image"
                    />
                  </figure>
                ))}
              </div>
            </div>
            {/* LEFT  */}
            <div className="pub-product__details">
              <div className="pub-product__details__name-wrapper">
                <div className="pub-product__details__name-wrapper__content-left">
                  <div className="pub-product__details__name-wrapper__content-left__name ">
                    <div className="pub-product__details__name-wrapper__content-left__name--title">
                      {productRedux.title}
                    </div>
                    <div className="pub-product__details__name-wrapper__content-left__name--brand mb-sm">
                      {productRedux.brand}
                    </div>
                  </div>
                </div>
                {/* RIGHT  */}
                <div className="pub-product__details__name-wrapper__content-right">
                  <div className="pub-product__details__name-wrapper__content-right__price">
                    <span className="pub-category__p-card__details__price--simbol">
                      $
                    </span>
                    <span className="pub-category__p-card__details__price--integer">
                      {productRedux.price.substring(-3, 2)}
                    </span>
                    <span className="pub-category__p-card__details__price--decimals">
                      {productRedux.price.substring(
                        productRedux.price.length - 3
                      )}
                    </span>
                  </div>
                </div>
              </div>
              {/* RATING STARS */}
              <div className="pub-product__details__rating-bar mb-sm">
                <span className="pub-category__p-card__details__rating__bar">
                  <svg className="icon pub-product__details__rating-bar--icon">
                    <use href={sprite + '#icon-star-full'} />
                  </svg>
                  <svg className="icon pub-product__details__rating-bar--icon">
                    <use href={sprite + '#icon-star-half'} />
                  </svg>
                  <svg className="icon pub-product__details__rating-bar--icon">
                    <use href={sprite + '#icon-star-empty'} />
                  </svg>
                </span>
                <div className="pub-category__p-card__details__rating__reviews">
                  <span>(</span>
                  <span
                    className="pub-category__p-card__details__rating__reviews--amount 
                         pub-product__details__rating-bar--amount
                  "
                  >
                    30
                  </span>
                  <span>)</span>
                </div>
              </div>
              {/* BUY MODULE  */}
              <div className="pub-product__details__buy-module ">
                <button
                  className="btn pub-product__details__buy-module--btn"
                  onClick={_addProductToCart.bind(this, productRedux.slug)}
                >
                  Add to cart
                </button>
                <div
                  className="pub-product__details__buy-module__icon"
                  onClick={_setFav}
                >
                  {favorite ? (
                    <svg className="icon pub-product__details__buy-module__icon--icon">
                      <use href={sprite_material + '#icon-favorite'} />
                    </svg>
                  ) : (
                    <svg className="icon pub-product__details__buy-module__icon--icon">
                      <use href={sprite_material + '#icon-favorite_outline'} />
                    </svg>
                  )}
                </div>
              </div>
            </div>
            {/* LEFT IN GRID  */}
            <div className="pub-product__product-summary mb-sm">
              <p className="pub-product__product-summary--text">
                {productRedux.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
