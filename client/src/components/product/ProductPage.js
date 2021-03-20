import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../navigation/BreadCrumbs';
import { Image } from 'cloudinary-react';

import { useDispatch, useSelector } from 'react-redux';
import { getProductInCartAction } from '../../store/actions/cartAction';
import { getOneProduct } from '../../store/actions/productAction';
import SlideInMessage from '../../utils/SlideInMessage';
import { Spinner } from '../../utils/LoadingComponent';

import sprite from '../../img/sprite.svg';
import sprite_material from '../../img/sprite_material.svg';

import { RatingBar, RatingBarShow } from '../../utils/RatingBar';

export default function ProductPage(props) {
  // REDUX
  const dispatch = useDispatch();

  const authRedux = useSelector((state) => state.auth);
  const loadingRedux = useSelector((state) => state.loading.loadingProductCart);
  const loadingRatingRedux = useSelector(
    (state) => state.loading.loadingRating
  );
  const productRedux = useSelector((state) => state.product.product);
  const cookieRedux = useSelector((state) => state.cookie.cookie);
  const messageRedux = useSelector((state) => state.message.message);
  const messageRatingRedux = useSelector(
    (state) => state.message.messageRating
  );

  // STATE
  const [favorite, setFavorite] = useState(false);
  const [done, setDone] = useState(false); // show V for 1 sec in cart icon afetr purchise been made

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
    let data;
    if (authRedux.isAuthenticated) {
      //User
      data = {
        productId: productRedux._id,
        userId: authRedux.user.id,
      };
    } else {
      //Guest
      data = {
        productId: productRedux._id,
        guestId: cookieRedux.guestId,
      };
    }

    dispatch(getProductInCartAction(data));
  };
  // DEFINE BUTTON TEXT
  useEffect(() => {
    if (loadingRedux) {
      setDone(true);
    }
    setTimeout(() => {
      setDone(false);
    }, 3000);
  }, [messageRedux, loadingRedux]);

  const RatingTotal = () => {
    let rating;
    if (productRedux.ratings.length > 0) {
      rating = productRedux.ratings
        .map((elem) => elem.rating)
        .reduce((acc, val) => acc + val);

      return rating / productRedux.ratings.length;
    } else {
      return (rating = 0);
    }
  };

  // COMPONENT
  if (!productRedux) {
    return <div className="pub-product page">Loading...</div>;
  } else {
    return (
      <div className="pub-product page">
        {/* SHOW MESSAGE ON BUYING PRODUCT  */}
        <SlideInMessage messageRedux={messageRedux} />

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
                      {productRedux.price}
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
                <RatingBarShow RatingTotal={RatingTotal} />

                <div className="pub-category__p-card__details__rating__reviews">
                  <span>(</span>
                  <span
                    className="pub-category__p-card__details__rating__reviews--amount 
                           pub-product__details__rating-bar--amount
                    "
                  >
                    {productRedux.ratings.length}
                  </span>
                  <span>)</span>
                </div>
              </div>
              {/* BUY MODULE  */}
              <div className="pub-product__details__buy-module ">
                {/* BUTTON  */}
                <button
                  className="btn pub-product__details__buy-module--btn"
                  onClick={_addProductToCart}
                >
                  {loadingRedux ? (
                    <svg
                      className="icon pub-category__p-card__cart--icon-spinner"
                      onClick={_addProductToCart}
                    >
                      <use href={sprite_material + '#icon-toys'} />
                    </svg>
                  ) : (
                    <div>{done ? 'Added!' : 'Add to cart'}</div>
                  )}
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
              {/* RATING  */}
              <div className="pub-product__details__rating">
                <div className="pub-product__details__rating__title">
                  <h3 className="heading-4 ">Rate product</h3>
                </div>
                <div className="pub-product__details__rating-bar">
                  <RatingBar
                    productId={props.match.params.productId}
                    slug={props.match.params.slug}
                  />
                  {loadingRatingRedux && <Spinner />}
                  {messageRatingRedux && (
                    <span className="icon btn-link__icon pub-product__details__rating__icon-check">
                      <svg className="icon pub-product__details__buy-module__icon--icon">
                        <use href={sprite_material + '#icon-check'} />
                      </svg>
                    </span>
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
        </div>
      </div>
    );
  }
}
