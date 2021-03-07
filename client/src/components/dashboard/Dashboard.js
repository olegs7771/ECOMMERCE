import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DashboardNav from './DashboardNav';

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
  const cartRedux = useSelector((state) => state.product.shoppingcart);

  // STATE
  const [modal, setModal] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  // TOGGLE MODAL
  const _openModelOrders = (e) => {
    e.stopPropagation();
    setModal(true);
    setShowOrders(true);
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

          <div className="dashboard__order">Order</div>
        </div>
      </div>
    </div>
  );
}
