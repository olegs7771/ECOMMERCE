import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsFromCartAction } from '../../store/actions/productAction';

import sprite_material from '../../img/sprite_material.svg';
import ShoppingCartItem from './ShoppingCartItem';

export default function ShoppingCart(props) {
  const dispatch = useDispatch();
  // REDUX
  const productsInCartRedux = useSelector(
    (state) => state.product.shoppingcart
  );
  const loadingRedux = useSelector((state) => state.loading.loading);
  const cookieRedux = useSelector((state) => state.cookie.cookie);

  // GET SHOPPINGCART ITEMS TO REDUX
  useEffect(() => {
    dispatch(getProductsFromCartAction({ guestId: cookieRedux.guestId }));
  }, [dispatch, cookieRedux.guestId]);
  console.log('productsInCartRedux', productsInCartRedux);
  return (
    <div className="page shoppingcart">
      {loadingRedux || productsInCartRedux.length === 0 ? (
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
            <div>
              <div className="shoppingcart__header ">
                <div className="heading-2 shoppingcart__header--text">
                  Shopping cart
                </div>
                <div className="shoppingcart__header__btn">
                  <div className="nav__link-icon-box">
                    <svg className="icon">
                      <use href={sprite_material + '#icon-keyboard_control'} />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="shoppingcart__checkout">
                <div className="shoppingcart__checkout__btn ">
                  <button className="btn shoppingcart__checkout__btn--btn">
                    Continue to checkout
                  </button>
                </div>
              </div>
              <div className="productlist">
                {productsInCartRedux.products.map((item, index) => (
                  <ShoppingCartItem key={index} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
