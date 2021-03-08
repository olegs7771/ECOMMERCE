import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardNav from './DashboardNav';
import OrderProductItem from '../order/OrderProductItem';

import ModalSlideToLeft from '../../utils/ModalSlideToLeft';
import {
  getAllOrdersAction,
  getOrderByIdAction,
} from '../../store/actions/orderAction';
export default function Dashboard(props) {
  // REDUX
  const dispatch = useDispatch();
  const authRedux = useSelector((state) => state.auth);
  const ordersRedux = useSelector((state) => state.order.orders);
  const orderRedux = useSelector((state) => state.order.order);
  const cartRedux = useSelector((state) => state.cart.cart_paid);

  // STATE
  const [modal, setModal] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  // TOGGLE MODAL
  const _openModelOrders = (e) => {
    e.stopPropagation();
    setModal(true);
  };
  const _closeModal = (e) => {
    e.stopPropagation();
    setModal(false);
  };

  //LOAD ALL ORDERS FOR USER
  useEffect(() => {
    const data = {
      userId: authRedux.user.id,
    };
    dispatch(getAllOrdersAction(data));
  }, [authRedux.user.id, dispatch]);

  //GET ORDER
  const _getOrder = (e) => {
    console.log('e getOrder', e);
    const data = {
      orderId: e._id,
      userId: authRedux.user.id,
    };
    dispatch(getOrderByIdAction(data));
  };

  //Show Order In Dasgboard
  useEffect(() => {
    if (Object.keys(orderRedux).length !== 0) {
      setShowOrders(true);
    }
  }, [orderRedux]);

  return (
    <div className="page dashboard" onClick={_closeModal}>
      <ModalSlideToLeft
        modal={modal}
        title="Orders"
        body={ordersRedux.map((order, index) => (
          <ul className="dashboard__modal__list" key={index}>
            <li
              className="dashboard__modal__item"
              onClick={_getOrder.bind(this, order)}
            >
              <span className="dashboard__modal--order">Payment at </span>{' '}
              <span className="dashboard__modal--order-date">
                {new Date(order.paymentAt).toLocaleString()}
              </span>
            </li>
          </ul>
        ))}
      />
      <div className="container">
        <div className="dashboard__wrapper">
          <DashboardNav openModelOrders={_openModelOrders} />

          <div className="dashboard__order__details">
            {!showOrders ? (
              <div>My Dashboard</div>
            ) : (
              <div className="dashboard__order__details__block">
                <div className="order__receipt__main__delivery__address__address">
                  <div className="order__receipt__main__delivery__address__date__title">
                    Client Address
                  </div>
                  <p className="order__receipt__main__delivery__address__address--text">
                    {orderRedux.suit} {orderRedux.street}
                  </p>
                  <p className="order__receipt__main__delivery__address__address--text">
                    {orderRedux.city} {orderRedux.province} ,{' '}
                    {orderRedux.zipcode} , {orderRedux.country}
                  </p>
                </div>
                <ul className="order__receipt__main__order__list">
                  <li className="order__receipt__main__order__item">
                    <span className="order__receipt__main__order__title">
                      Items in cart
                    </span>
                    <span className="order__receipt__main__order__text">
                      {cartRedux.products.length}
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
                    <span className="order__receipt__main__order__title-total ">
                      Total
                    </span>
                    &nbsp;
                    <span className="order__receipt__main__order__text-total">
                      ${orderRedux.total}
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="dashboard__order__products">
            <div className="order__cart">
              <div className="productlist">
                {cartRedux.products.map((item, index) => (
                  <OrderProductItem key={index} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
