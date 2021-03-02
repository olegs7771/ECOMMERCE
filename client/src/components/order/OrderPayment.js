import React, { useState } from 'react';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

import { loadStripe } from '@stripe/stripe-js';

const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const _onSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (error) {
      console.log('error', error);
    } else {
      console.log('paymentMethod', paymentMethod);
    }
  };

  return (
    <form onSubmit={_onSubmit}>
      <CardElement />
      <button className="btn" type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default function OrderPayment() {
  const [stipePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
  );

  // const stripePromise = loadStripe(
  //   process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
  // );

  return (
    <Elements stripe={stipePromise}>
      <CheckOutForm />
    </Elements>
  );
}
