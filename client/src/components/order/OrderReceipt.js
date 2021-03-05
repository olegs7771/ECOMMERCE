import React, { useEffect } from 'react';
import sprite from '../../img/sprite.svg';
import { useSelector, useDispatch } from 'react-redux';
import { getOrderAction } from '../../store/actions/orderAction';
import { getProductsCartGuestAction } from '../../store/actions/productAction';

export default function OrderReceipt(props) {
  const dispatch = useDispatch();
  // REDUX

  const cartRedux = useSelector((state) => state.product.shoppingcart);
  const orderRedux = useSelector((state) => state.order.order);
  const cookieRedux = useSelector((state) => state.cookie.cookie);
  const authRedux = useSelector((state) => state.auth);

  // LOAD ORDER AND CART ON COMPONENT to show in receipt
  useEffect(() => {
    const data = {
      guestId: cookieRedux.guestId,
      orderId: props.match.params.orderId,
    };
    dispatch(getOrderAction(data));
  }, []);

  if (Object.keys(orderRedux).length === 0) {
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
                  Your order number is 11111111000000000
                </p>
                <p className="order__receipt__header__order-number--text">
                  A confirmation of your order has been sent to some@email.com
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
                      Wed
                    </div>
                    <div className="order__receipt__main__delivery__date--day">
                      22
                    </div>
                    <div className="order__receipt__main__delivery__date--month">
                      MAY
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
                      14:00 - 15:00
                    </p>
                  </div>
                  <div className="order__receipt__main__delivery__address__address">
                    <div className="order__receipt__main__delivery__address__date__title">
                      Address
                    </div>
                    <p className="order__receipt__main__delivery__address__address--text">
                      85 israel asper way
                    </p>
                    <p className="order__receipt__main__delivery__address__address--text">
                      Winnipeg,MB R3C 0L5,Canada
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
                      <span className="order__receipt__main__order__text">
                        2
                      </span>
                    </li>
                    <li className="order__receipt__main__order__item">
                      <span className="order__receipt__main__order__title">
                        Delivery
                      </span>
                      <span className="order__receipt__main__order__text">
                        $10.00
                      </span>
                    </li>
                    <li className="order__receipt__main__order__item mb-md">
                      <span className="order__receipt__main__order__title-total">
                        Order Total
                      </span>
                      <span className="order__receipt__main__order__text-total">
                        $30.00
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
              <div className="order__receipt__costumer">Costumer</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
