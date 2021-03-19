import React, { useState, useEffect } from 'react';
import sprite from '../img/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { rateProductAction } from '../store/actions/ratingAction';

export const RatingBar = ({ productId, slug }) => {
  const dispatch = useDispatch();
  const [rate, setRate] = useState(0);

  //SEND RATE
  useEffect(() => {
    if (rate > 0) {
      const data = {
        rating: rate,
        productId,
        slug,
      };
      dispatch(rateProductAction(data));
    }
  }, [rate, dispatch, productId, slug]);

  return (
    <span className="pub-category__p-card__details__rating__bar">
      <svg
        className={
          rate >= 1
            ? 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup icon pub-product__details__rating-bar__icon--active'
            : 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup'
        }
        onClick={() => setRate(1)}
      >
        <use href={sprite + '#icon-star-full'} />
      </svg>
      <svg
        className={
          rate >= 2
            ? 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup icon pub-product__details__rating-bar__icon--active'
            : 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup'
        }
        onClick={() => setRate(2)}
      >
        <use href={sprite + '#icon-star-full'} />
      </svg>
      <svg
        className={
          rate >= 3
            ? 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup icon pub-product__details__rating-bar__icon--active'
            : 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup'
        }
        onClick={() => setRate(3)}
      >
        <use href={sprite + '#icon-star-full'} />
      </svg>
      <svg
        className={
          rate >= 4
            ? 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup icon pub-product__details__rating-bar__icon--active'
            : 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup'
        }
        onClick={() => setRate(4)}
      >
        <use href={sprite + '#icon-star-full'} />
      </svg>
      <svg
        className={
          rate >= 5
            ? 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup icon pub-product__details__rating-bar__icon--active'
            : 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup'
        }
        onClick={() => setRate(5)}
      >
        <use href={sprite + '#icon-star-full'} />
      </svg>
      <svg
        className={
          rate >= 6
            ? 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup icon pub-product__details__rating-bar__icon--active'
            : 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup'
        }
        onClick={() => setRate(6)}
      >
        <use href={sprite + '#icon-star-full'} />
      </svg>
      <svg
        className={
          rate >= 7
            ? 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup icon pub-product__details__rating-bar__icon--active'
            : 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup'
        }
        onClick={() => setRate(7)}
      >
        <use href={sprite + '#icon-star-full'} />
      </svg>
      <svg
        className={
          rate >= 8
            ? 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup icon pub-product__details__rating-bar__icon--active'
            : 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup'
        }
        onClick={() => setRate(8)}
      >
        <use href={sprite + '#icon-star-full'} />
      </svg>
      <svg
        className={
          rate >= 9
            ? 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup icon pub-product__details__rating-bar__icon--active'
            : 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup'
        }
        onClick={() => setRate(9)}
      >
        <use href={sprite + '#icon-star-full'} />
      </svg>
      <svg
        className={
          rate >= 10
            ? 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup icon pub-product__details__rating-bar__icon--active'
            : 'icon pub-product__details__rating-bar__icon icon pub-product__details__rating-bar__icon--scaleup'
        }
        onClick={() => setRate(10)}
      >
        <use href={sprite + '#icon-star-full'} />
      </svg>
    </span>
  );
};

export const RatingBarShow = ({ RatingTotal }) => {
  return (
    <span className="pub-category__p-card__details__rating__bar">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star, i) => (
        <svg
          className={
            star <= RatingTotal()
              ? 'icon pub-product__details__rating-bar__icon--active'
              : 'icon pub-product__details__rating-bar__icon'
          }
          key={i}
        >
          <use href={sprite + '#icon-star-full'} />
        </svg>
      ))}
    </span>
  );
};
