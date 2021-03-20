import React, { useEffect } from 'react';
import sprite from '../../img/sprite.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderByIdAction } from '../../store/actions/orderAction';
// import { getCartById } from '../../store/actions/productAction';
import { clearCartAction } from '../../store/actions/cartAction';

export default function OrderReceipt(props) {
  const dispatch = useDispatch();
  // REDUX

  const cartRedux = useSelector((state) => state.cart.cart_paid);
  const orderRedux = useSelector((state) => state.order.order);
  const cookieRedux = useSelector((state) => state.cookie.cookie);
  const authRedux = useSelector((state) => state.auth);

  //GET PRODUCTS COUNT
  let count;
  const arr = cartRedux.products;
  if (cartRedux.products.length !== 0) {
    (() => {
      count = arr.map((elem) => elem.quantity).reduce((acc, val) => acc + val);
    })();
  }

  //CLEAR shopping cart. Not to show in navigation icon. Cause user already had paid.
  useEffect(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  // LOAD ORDER ON COMPONENT to show in receipt
  useEffect(() => {
    let data;
    if (authRedux.isAuthenticated) {
      data = {
        userId: authRedux.user.id,
        orderId: props.match.params.orderId,
      };
    } else {
      data = {
        guestId: cookieRedux.guestId,
        orderId: props.match.params.orderId,
      };
    }

    dispatch(getOrderByIdAction(data));
  }, [
    authRedux.isAuthenticated,
    authRedux.user.id,
    cookieRedux.guestId,
    props.match.params.orderId,
    dispatch,
  ]);

  if (
    Object.keys(orderRedux).length === 0 ||
    Object.keys(cartRedux).length === 0
  ) {
    return (
      <div className="page">
        <div className="container">Loading</div>
      </div>
    );
  }

  return (
    <div className="page order">
      <div className="container">
        <div className="order__receipt__wrapper">
          {/* HEADER  */}
          <div className="order__receipt__header__container">
            {/* LEFT  */}
            <div className="order__receipt__header__left">
              <div className="order__receipt__header__icon">
                <svg className="icon order__receipt__header__icon--icon">
                  <use href={sprite + '#icon-checkmark'} />
                </svg>
              </div>
            </div>
            {/* RIGHT  */}
            <div className="order__receipt__header__right">
              <div className="order__receipt__header__title mb-xsm">
                <div className="order__receipt__header__title--text">
                  Your order has been placed.
                </div>
              </div>
              <div className="order__receipt__header__order-number">
                <p className="order__receipt__header__order-number--text">
                  Your order number is
                  <span className="order__receipt__header__order-number--text-bold">
                    {' '}
                    {orderRedux.orderNumber}
                  </span>
                </p>
                <p className="order__receipt__header__order-number--text">
                  A confirmation of your order has been sent to{' '}
                  <span className="order__receipt__header__order-number--text-bold">
                    {orderRedux.email}
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/* HEADER END  */}
          {/*///////////////////////////////////////////////*/}
          <main className="order__receipt__main">
            {/* MAIN LEFT  */}
            <div className="order__receipt__main__delivery">
              <div className="order__receipt__main__delivery__title mb-sm">
                <div className="order__receipt__main__delivery__title--text">
                  Delivery Details
                </div>
              </div>
              {/* DELIVERY BLOCK  */}
              <div className="order__receipt__main__delivery__block">
                {/* DATE  */}
                <div className="order__receipt__main__delivery__date">
                  <div className="order__receipt__main__delivery__date__block">
                    <div className="order__receipt__main__delivery__date--weekday">
                      {
                        new Date(orderRedux.delivery_date)
                          .toDateString()
                          .split(' ')[0]
                      }
                    </div>
                    <div className="order__receipt__main__delivery__date--day">
                      {
                        new Date(orderRedux.delivery_date)
                          .toDateString()
                          .split(' ')[2]
                      }
                    </div>
                    <div className="order__receipt__main__delivery__date--month">
                      {
                        new Date(orderRedux.delivery_date)
                          .toDateString()
                          .split(' ')[1]
                      }
                    </div>
                  </div>
                </div>
                {/* ADDRESS  */}
                <div className="order__receipt__main__delivery__address">
                  <div className="order__receipt__main__delivery__address__date mb-xsm">
                    <p className="order__receipt__main__delivery__address__date__title">
                      Delivery Time
                    </p>
                    <p className="order__receipt__main__delivery__address__date--text">
                      {orderRedux.delivery_time}
                    </p>
                  </div>
                  <div className="order__receipt__main__delivery__address__address">
                    <div className="order__receipt__main__delivery__address__date__title">
                      Address
                    </div>
                    <p className="order__receipt__main__delivery__address__address--text">
                      {orderRedux.suit} {orderRedux.street}
                    </p>
                    <p className="order__receipt__main__delivery__address__address--text">
                      {orderRedux.city} {orderRedux.province} ,{' '}
                      {orderRedux.zipcode} , {orderRedux.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* MAIN RIGHT  */}
            <div className="order__receipt__main__order__wrapper">
              <div className="order__receipt__main__order">
                <div className="order__receipt__main__delivery__title mb-sm">
                  <div className="order__receipt__main__delivery__title--text">
                    Order Summary
                  </div>
                </div>
                <div className="order__receipt__main__order__block">
                  <ul className="order__receipt__main__order__list">
                    <li className="order__receipt__main__order__item">
                      <span className="order__receipt__main__order__title">
                        Items in cart
                      </span>
                      {/* {getItemsCount(cartRedux.products)} */}
                      {cartRedux.products.length !== 0 && (
                        <span className="order__receipt__main__order__text">
                          {count}
                        </span>
                      )}
                    </li>
                    <li className="order__receipt__main__order__item">
                      <span className="order__receipt__main__order__title">
                        Delivery
                      </span>
                      <span className="order__receipt__main__order__text">
                        {/* $10.00 */}${orderRedux.deliveryPrice}
                      </span>
                    </li>
                    <li className="order__receipt__main__order__item mb-md">
                      <span className="order__receipt__main__order__title-total">
                        Order Total
                      </span>
                      <span className="order__receipt__main__order__text-total">
                        ${orderRedux.total}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="order__receipt__cta">
                  <button className="btn order__receipt__cta__btn">
                    View Items
                  </button>
                </div>
              </div>
              <div className="order__receipt__costumer mb-xsm">
                <div className="order__receipt__costumer__policy">
                  <p className="order__receipt__costumer__policy--text">
                    You can amend or cancel your order until:
                  </p>
                </div>
                <div className="order__receipt__costumer__policy__date mb-xsm">
                  <div className="order__receipt__costumer__policy__date--text">
                    Tuesday 21 May, 23:43
                  </div>
                </div>
                <button className="btn order__receipt__costumer__policy__btn">
                  Make changes to your order
                </button>
              </div>
              <button
                className="btn order__receipt__cta__btn"
                onClick={() => props.history.push('/')}
              >
                Continue Shopping
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
