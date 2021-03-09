import React from 'react';
import OrderProductItem from '../order/OrderProductItem';

export default function DashboardOrder({ order, cart }) {
  return (
    <div className="dashboard__order__block">
      <div className="dashboard__order__details">
        {/* //address */}
        <div className="dashboard__order__details__address">
          <div className="order__receipt__main__delivery__address__date__title">
            Client Address
          </div>
          <p className="order__receipt__main__delivery__address__address--text">
            {order.suit} {order.street}
          </p>
          <p className="order__receipt__main__delivery__address__address--text mb-sm">
            {order.city} {order.province} , {order.zipcode} , {order.country}
          </p>
          {/* //order details  */}
          <hr className="dashboard__order__details__line" />
          <ul className=" dashboard__order__details__address__list">
            <li className="dashboard__order__details__address__item">
              <span className="order__receipt__main__order__title">
                Items in cart
              </span>{' '}
              <span className="order__receipt__main__order__text">
                {cart.products.length}
              </span>
            </li>
            <li className="dashboard__order__details__address__item">
              <span className="order__receipt__main__order__title">
                Delivery
              </span>
              <span className="order__receipt__main__order__text">$10.00</span>
            </li>
            <li className="mb-md dashboard__order__details__address__item">
              <span className="order__receipt__main__order__title-total ">
                Total
              </span>
              &nbsp;
              <span className="order__receipt__main__order__text-total">
                ${order.total}
              </span>
            </li>
          </ul>
          <div className="dashboard__order__details__date">
            <span className="dashboard__order__details__date--text">
              Paid on
            </span>
            <span className="dashboard__order__details__date--date">
              {new Date(order.paymentAt).toDateString()}
            </span>
          </div>
        </div>
        <div className="dashboard__order__details__cart">
          <div className="dashboard__order__products">
            <div className=" dashboard__order__cart">
              <div className="productlist">
                {cart.products.map((item, index) => (
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
