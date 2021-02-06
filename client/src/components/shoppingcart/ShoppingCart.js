import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProdactsFromCookiesAction } from '../../store/actions/productAction';
import sprite_material from '../../img/sprite_material.svg';

export default function ShoppingCart(props) {
  const dispatch = useDispatch();
  // REDUX
  const productsInCartRedux = useSelector(
    (state) => state.product.shoppingcart
  );
  const loadingRedux = useSelector((state) => state.loading.loading);

  // GET PRODUCTS ON LOAD
  const arrOfIds = Object.keys(props.cookies.cookies).map((el) =>
    el.substring(12)
  );
  console.log('arrOfIds', arrOfIds);

  useEffect(() => {
    dispatch(fetchProdactsFromCookiesAction({ data: arrOfIds }));
  }, [dispatch]);

  return (
    <div className="page shoppingcart">
      {loadingRedux || !productsInCartRedux ? (
        <div className="shoppingcart__content">Loading</div>
      ) : (
        <div className="shoppingcart__content">
          {productsInCartRedux.length === 0 ? (
            <div>
              <div className="shoppingcart__header heading-2 mb-sm">
                Your cart is empty
              </div>
              <div className="shoppingcart__loginpromo">
                <div className="shoppingcart__loginpromo__main">
                  <h3 className="heading-3">Have an account?</h3>
                  <div className="shoppingcart__loginpromo__main__hyperlink">
                    <a
                      href="/register"
                      className="shoppingcart__loginpromo__main--link"
                    >
                      Join{' '}
                    </a>
                    or{' '}
                    <a
                      href="/login"
                      className="shoppingcart__loginpromo__main--link"
                    >
                      log in{' '}
                    </a>
                    for a better experience checkout.
                  </div>
                </div>
                <div className="shoppingcart__loginpromo__icon">
                  <svg className="icon shoppingcart__loginpromo--icon">
                    <use href={sprite_material + '#icon-person_outline'} />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div>Products</div>
          )}
        </div>
      )}
    </div>
  );
}
