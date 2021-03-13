import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SpinnerPuffLoader } from '../../utils/LoadingComponent';
import {
  getProductsCartGuestAction,
  getProductsCartUserAction,
  // deleteCartAction,
} from '../../store/actions/cartAction';

import OrderProductItem from './OrderProductItem';
import OrderAddressForm from './OrderAddressForm';

import { withRouter } from 'react-router-dom';

const Order = (props) => {
  const dispatch = useDispatch();
  // REDUX

  const cartRedux = useSelector((state) => state.cart.shoppingcart);
  const cookieRedux = useSelector((state) => state.cookie.cookie);
  const authRedux = useSelector((state) => state.auth);
  // const messageRedux = useSelector((state) => state.message.message);

  // GET SHOPPINGCART ITEMS FROM DB
  useEffect(() => {
    if (authRedux.isAuthenticated) {
      dispatch(getProductsCartUserAction({ userId: authRedux.user.id }));
    } else {
      dispatch(getProductsCartGuestAction({ guestId: cookieRedux.guestId }));
    }
  }, [
    dispatch,
    cookieRedux.guestId,
    authRedux.isAuthenticated,
    authRedux.user.id,
  ]);

  //  FUNCTION TO CALCULATE TOTAL
  let totalPrice;
  let totalItems;
  if (Object.keys(cartRedux).length !== 0) {
    const arrOfProducts = cartRedux.products;
    if (arrOfProducts) {
      if (arrOfProducts.length > 0) {
        const total = (arr) => {
          return arr.map(
            (elem) => parseFloat(elem.product.price) * elem.quantity
          );
        };
        const totalItemFunc = (arr) => {
          return arr.map((elem) => 1 * elem.quantity);
        };
        totalPrice = total(arrOfProducts).reduce((acc, val) => acc + val);
        totalPrice = Math.round((totalPrice + Number.EPSILON) * 1000) / 1000;
        totalItems = totalItemFunc(arrOfProducts).reduce(
          (acc, val) => acc + val
        );
      }
    }
  }

  // COMPONENT
  if (Object.keys(cartRedux).length !== 0) {
    return (
      <div className="order page">
        <div className="container">
          <div className="order__header mb-md">
            <h2 className="heading-2 ">Order Summary</h2>
            <a href="/shoppingcart" className="order__header__edit">
              Edit Cart
            </a>
          </div>
          <div className="order__wrapper">
            <div className="order__buyer">
              <div className="order__buyer__address-heading">
                <div className="h3 heading-3">Shipping Address</div>
                <div className="order__buyer__address-heading--icon">
                  * - required fields
                </div>
              </div>
              <OrderAddressForm
                cartId={cartRedux._id}
                history={props.history}
                total={totalPrice}
                totalItems={totalItems}
              />
            </div>
            <div className="order__cart">
              <div className="productlist">
                {cartRedux.products.map((item, index) => (
                  <OrderProductItem key={index} item={item} />
                ))}
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
                    ${totalPrice ? totalPrice.toFixed(2) : ''}
                  </span>
                </div>
              </div>
            </div>
          </div>
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
};

export default withRouter(Order);
