import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';
import { paymentIntentAction } from '../../store/actions/orderAction';

const CheckOutForm = (props) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  // REDUX
  const authRedux = useSelector((state) => state.auth);

  const _onSubmit = async (e) => {
    const { fname, lname, email, phone } = props.props.order;
    const billing_details = {
      name: fname + ' ' + lname,
      email,
      phone,
    };
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details,
    });
    if (error) {
      return console.log('error', error);
    }
    let data;
    if (authRedux.isAuthenticated) {
      data = {
        total: props.props.order.total * 100,
        paymentMethod,
        userId: authRedux.user.id,
      };
    } else {
      data = {
        total: props.props.order.total * 100,
        paymentMethod,
        guestId: props.props.order.guestId,
      };
    }

    dispatch(paymentIntentAction(data, props.props.history));
  };

  return (
    <form onSubmit={_onSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className="order__btn-group">
        {props.loading ? (
          <button className="btn" type="submit" disabled={!stripe}>
            Processing..
          </button>
        ) : (
          <button className="btn" type="submit" disabled={!stripe}>
            Pay ${props.props.order.total}
          </button>
        )}
      </div>
    </form>
  );
};

export default function OrderPayment(props) {
  const [stipePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
  );

  return (
    <Elements stripe={stipePromise}>
      <CheckOutForm props={props} />
    </Elements>
  );
}
