import React, { useState } from 'react';
import TextInputForm from '../../utils/TextInputForm';

export default function OrderAddressForm() {
  // STATE
  const initialState = {
    first_name: '',
    last_name: '',
    business_name: '',
    street_address: '',
    suit_apt: '',
    city: '',
    province_territory: [
      'Ontario',
      'Quebec',
      'New Brunswick',
      'Manitoba',
      'British Columbia',
      'Prince Edward Island',
      'Saskatchewan',
      'Alberta',
      'Newfoundland and Labrador',
      'Northwest Territories',
      'Yukon',
      'Nunavut',
    ],
    zipcode: '',
    phone: '',
  };

  const [values, setValues] = useState(initialState);

  const _onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="order__buyer__address">
      <TextInputForm
        value={values.first_name}
        _onChange={_onChange}
        label="First Name"
        name="first_name"
        placeholder="John"
        //  error,
        //  _checkField,
      />
      <TextInputForm
        value={values.last_name}
        _onChange={_onChange}
        label="Last Name"
        name="last_name"
        placeholder="Brown"
      />
      <TextInputForm />
    </div>
  );
}
