import React, { useState } from 'react';
import TextInputForm from '../../utils/TextInputForm';
import SelectInputForm from '../../utils/SelectInputForm';

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
    province_territory_value: '',
    zipcode: '',
    phone: '',
  };

  const [values, setValues] = useState(initialState);

  const _onChange = (e) => {
    setValues({ ...initialState, [e.target.name]: e.target.value });
  };

  return (
    <div className="order__buyer__address">
      <div className="order__buyer__address__row">
        <TextInputForm
          value={values.first_name}
          _onChange={_onChange}
          label="First Name"
          name="first_name"
          placeholder="John"
          styles={{ title: 'form-label--name' }}
          //  error,
          //  _checkField,
        />
        <div className="order__buyer__address__row__gap"></div>
        <TextInputForm
          value={values.last_name}
          _onChange={_onChange}
          label="Last Name"
          name="last_name"
          placeholder="Brown"
          styles={{ title: 'form-label--name' }}
        />
      </div>
      <div className="order__buyer__address__row">
        <TextInputForm
          value={values.business_name}
          _onChange={_onChange}
          label="Business Name"
          name="business_name"
          placeholder="Your business name.. (optional)"
          styles={{ title: 'form-label--name' }}
        />
        <div className="order__buyer__address__row__gap"></div>

        <TextInputForm
          value={values.street_address}
          _onChange={_onChange}
          label="Street"
          name="street_address"
          placeholder=" Your street name.."
          styles={{ title: 'form-label--name' }}
        />
      </div>
      <div className="order__buyer__address__row">
        <TextInputForm
          value={values.suit_apt}
          _onChange={_onChange}
          label="Suit/Apt"
          name="suit_apt"
          placeholder=" Suit or apartment "
          styles={{ title: 'form-label--name' }}
        />
        <div className="order__buyer__address__row__gap"></div>

        <TextInputForm
          value={values.city}
          _onChange={_onChange}
          label="City"
          name="city"
          placeholder=" City "
          styles={{ title: 'form-label--name' }}
        />
      </div>
      <div className="order__buyer__address__row">
        <div className="order__buyer__address__row__select-wrapper">
          <SelectInputForm
            _onChange={_onChange}
            array={initialState.province_territory}
            value={values.province_territory_value}
            styles={{
              title: 'form-label--name',
              form_input: 'form-input-select',
            }}
            name="province_territory_value"
            label="Province/Territory"
            select="Select Province/Territory"
            title="Select Province/Territory"
          />
        </div>
        <div className="order__buyer__address__row__gap"></div>

        <TextInputForm
          value={values.zipcode}
          _onChange={_onChange}
          label="Zipcode"
          name="zipcode"
          placeholder=" Zipcode "
          styles={{ title: 'form-label--name' }}
        />
      </div>
      <button className="btn">Put an order</button>
    </div>
  );
}
