import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalSlideToLeft from '../../utils/ModalSlideToLeft';
import { getAllOrdersAction } from '../../store/actions/orderAction';
export default function Dashboard(props) {
  // REDUX
  const dispatch = useDispatch();
  const authRedux = useSelector((state) => state.auth);
  const ordersRedux = useSelector((state) => state.order.orders);

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

  return (
    <div className="page dashboard" onClick={_closeModal}>
      <ModalSlideToLeft
        modal={modal}
        title="Orders"
        body={ordersRedux.map((order, index) => (
          <ul className="dashboard__modal__list" key={index}>
            <li className="dashboard__modal__item">
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
          <div className="dashboard__nav">
            <ul className="dashboard__nav__list">
              <li
                className="dashboard__nav__item dashboard__nav__item__orders"
                onClick={_openModelOrders}
              >
                <a href="#!" className="dashboard__nav__link">
                  My Orders
                </a>
              </li>
              <li className="dashboard__nav__item">
                <a href="#!" className="dashboard__nav__link">
                  Orders
                </a>
              </li>
              <li className="dashboard__nav__item">
                <a href="#!" className="dashboard__nav__link">
                  Orders
                </a>
              </li>
            </ul>
          </div>
          {/* <div className="dashboard__details">
            <ul className="dashboard__details__list">
              <li className="dashboard__details__item">
                <a href="#!" className="dashboard__details__link">
                  order date
                </a>
              </li>
              <li className="dashboard__details__item">
                <a href="#!" className="dashboard__details__link">
                  order date
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
}
