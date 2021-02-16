import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsFromCartAction } from '../../store/actions/productAction';
import { Spinner, SpinnerPuffLoader } from '../../utils/LoadingComponent';
import sprite_material from '../../img/sprite_material.svg';
import ShoppingCartItem from './ShoppingCartItem';
import { drawerToggle } from '../../store/actions/drawerAction';

export default function ShoppingCart(props) {
  const dispatch = useDispatch();
  // REDUX
  const drawerRedux = useSelector((state) => state.drawer.drawer);
  const cartRedux = useSelector((state) => state.product.shoppingcart);
  const loadingRedux = useSelector((state) => state.loading.loading);
  const cookieRedux = useSelector((state) => state.cookie.cookie);
  const authRedux = useSelector((state) => state.auth);
  const messageRedux = useSelector((state) => state.message.message);

  // STATE

  // GET SHOPPINGCART ITEMS TO REDUX
  useEffect(() => {
    dispatch(getProductsFromCartAction({ guestId: cookieRedux.guestId }));
  }, [dispatch, cookieRedux.guestId]);

  //  FUNCTION TO CALCULATE TOTAL
  let totalPrice;
  if (Object.keys(cartRedux).length !== 0) {
    const arrOfProducts = cartRedux.products;
    // console.log('arrOfProducts', arrOfProducts.length);
    if (arrOfProducts) {
      if (arrOfProducts.length > 0) {
        const total = (arr) => {
          return arr.map(
            (elem) => parseFloat(elem.product.price) * elem.quantity
          );
        };
        totalPrice = total(arrOfProducts).reduce((acc, val) => acc + val);
      }
    }
  }
  if (Object.keys(cartRedux).length !== 0) {
    return (
      <div className="page shoppingcart">
        <div
          className={drawerRedux ? 'overlay overlay--visible' : 'overlay'}
          onClick={() => dispatch(drawerToggle(false))}
        ></div>
        {/* SHOW MESSAGE ON BUYING PRODUCT  */}

        <div
          className={
            messageRedux
              ? 'slidein__message slidein__message--visible slidein__message--visible__remove'
              : 'slidein__message'
          }
        >
          <div className="slidein__message__text__remove ">
            <p className="slidein__message__text--text">
              <span className="slidein__message__text--title">
                {messageRedux ? messageRedux.split(':')[0] : null}
              </span>
              {messageRedux ? messageRedux.split(':')[1] : null}
            </p>
          </div>
        </div>

        <div className="shoppingcart__content">
          {authRedux.isAuthenticated ? (
            /* AUTHANTICATED USER */
            <div>
              {cartRedux.products.length === 0 ? (
                // CART EMPTY
                <div>
                  <div className="shoppingcart__header heading-2 mb-sm">
                    Your cart is empty
                  </div>
                </div>
              ) : (
                // CART NOT EMPTY
                <div>
                  <div className="shoppingcart__header ">
                    <div className="heading-2 shoppingcart__header--text">
                      Shopping cart
                    </div>
                    <div className="shoppingcart__header__btn">
                      <div className="nav__link-icon-box">
                        <svg className="icon">
                          <use
                            href={sprite_material + '#icon-keyboard_control'}
                          />
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
                    {cartRedux.products.map((item, index) => (
                      <ShoppingCartItem key={index} item={item} />
                    ))}
                  </div>
                  <div className="shoppingcart__ordersummary">
                    Order Summary
                  </div>
                </div>
              )}
            </div>
          ) : (
            /*  NOT ATHANTICATED USER (GUEST) ❗ */
            <div>
              {/* CART EMPTY  */}
              {cartRedux.products.length === 0 ? (
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
                          <use
                            href={sprite_material + '#icon-keyboard_control'}
                          />
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
                    {cartRedux.products.map((item, index) => (
                      <ShoppingCartItem key={index} item={item} />
                    ))}
                  </div>
                  {/* LOGIN PROMO  */}
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
                  <div className="shoppingcart__ordersummary">
                    <div className="mb-sm">
                      <strong>Order summary</strong>
                    </div>
                    <div className="shoppingcart__ordertotal__row ">
                      <span></span>
                    </div>

                    <div className="shoppingcart__ordertotal__row mb-sm">
                      <div className="shoppingcart__ordertotal-delivery-lable">
                        Total delivery cost
                      </div>
                      <div className="shoppingcart__ordertotal-delivery-price">
                        Exluding delivery
                      </div>
                    </div>
                    <hr className="shoppingcart__ordersummary__divider mb-sm" />
                    <div className="shoppingcart__ordertotal__row">
                      <span className="shoppingcart__ordersummary__total-lable">
                        Subtotal
                      </span>
                      <span className="shoppingcart__ordersummary__total-price">
                        ${totalPrice}
                      </span>
                    </div>
                  </div>
                  <div className="shoppingcart__checkout">
                    <div className="shoppingcart__checkout__btn ">
                      <button className="btn shoppingcart__checkout__btn--btn">
                        Continue to checkout
                      </button>
                    </div>
                  </div>

                  {/* LOGIN PROMO END   */}
                </div>
              )}
              {/* NOT ATHANTICATED USER END  */}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="page shoppingcart">
        <SpinnerPuffLoader />
      </div>
    );
  }
}
