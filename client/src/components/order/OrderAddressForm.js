import React, { useState } from 'react';
import TextInputForm from '../../utils/TextInputForm';
import SelectInputForm from '../../utils/SelectInputForm';
import CanadianCitiesFieldForm from '../../utils/CanadianCitiesFieldForm';
import { useDispatch, useSelector } from 'react-redux';
import { createOrderGuestAction } from '../../store/actions/orderAction';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function OrderAddressForm() {
  const dispatch = useDispatch();
  // REDUX
  const authRedux = useSelector((state) => state.auth);
  const cookieRedux = useSelector((state) => state.cookie.cookie);

  // STATE
  const initialState = {
    first_name: '',
    last_name: '',
    business_name: '',
    email: '',
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
      'Nova Scotia',
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
  const [showCity, setShowCity] = useState(false); //toggle open input field for other city

  const _onChange = (e) => {
    console.log('e', e.target.name);
    if (e.target === undefined) {
      setValues({ ...values, phone: e }); //for phone field
    } else {
      // setShowCity(false);
      setValues({ ...values, [e.target.name]: e.target.value });
    }
    //Handle other city not in list
    if (e.target.name === 'city' && e.target.value === 'other') {
      console.log('other city', e.target.value);
      setShowCity(true);
    }
    if (e.target.name === 'province_territory_value') {
      setShowCity(false);
    }
  };

  // CREATE ORDER ACTION
  const _makeOrder = () => {
    let buyerObj = {
      fname: values.first_name,
      lname: values.last_name,
      email: values.email,
      city: values.city,
      suit: values.suit_apt,
      street: values.street_address,
      phone: values.phone,
      zipcode: values.zipcode,
    };
    let data;
    if (authRedux.isAuthenticated) {
      //User
      data = {
        ...buyerObj,
        userId: authRedux.user.id,
      };
    } else {
      //Guest
      data = {
        ...buyerObj,
        guestId: cookieRedux.guestId,
      };
    }
    dispatch(createOrderGuestAction(data));
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
          required={true}
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
          required={true}
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
          value={values.email}
          _onChange={_onChange}
          label="Email"
          name="email"
          placeholder=" example@somemail.com "
          styles={{ title: 'form-label--name' }}
          containerClass={{ width: '100%' }}
          required={true}
        />
      </div>
      <div className="order__buyer__address__row">
        <div className="order__buyer__address__row__wrapper">
          <SelectInputForm
            _onChange={_onChange}
            array={initialState.province_territory}
            value={values.province_territory_value}
            styles={{
              title: 'form-label--name form-label--name__select',
              form_input: 'form-input-select',
            }}
            name="province_territory_value"
            label="Province/Territory"
            select="Select Province/Territory"
            title="Select Province/Territory"
            required={true}
          />
        </div>
        <div className="order__buyer__address__row__gap"></div>
        {showCity ? (
          <TextInputForm
            value={values.city}
            _onChange={_onChange}
            label="City/Town"
            name="city"
            placeholder=" other city/town "
            styles={{ title: 'form-label--name' }}
            required={true}
          />
        ) : (
          <div className="order__buyer__address__row__wrapper">
            <CanadianCitiesFieldForm
              _onChange={_onChange}
              province={values.province_territory_value}
              value={values.city}
              styles={{
                title: 'form-label--name form-label--name__select',
                form_input: 'form-input-select',
              }}
              name="city"
              label="City/Town"
              select="Select City/Town"
              title="City/Town"
              required={true}
            />
          </div>
        )}
      </div>

      <div className="order__buyer__address__row">
        <TextInputForm
          value={values.suit_apt}
          _onChange={_onChange}
          label="Suit/Apt"
          name="suit_apt"
          placeholder=" Suit or apartment "
          styles={{ title: 'form-label--name' }}
          required={true}
        />
        <div className="order__buyer__address__row__gap"></div>

        <TextInputForm
          value={values.street_address}
          _onChange={_onChange}
          label="Street"
          name="street_address"
          placeholder=" Your street name.."
          styles={{ title: 'form-label--name' }}
          required={true}
        />
      </div>
      <div className="order__buyer__address__row">
        <div className="order__buyer__address__row__wrapper mb-sm">
          <div className="order__buyer__address__row__phone--lable">
            Phone
            <span className="order__buyer__address__row__phone--lable-icon">
              *
            </span>
          </div>
          <div className="order__buyer__address__row__wrapper">
            <PhoneInput
              value={values.phone}
              onChange={(phone) => _onChange(phone)}
              onlyCountries={['ca', 'us']}
              enableAreaCodes={['ca', 'usa']}
              country={'ca'}
              inputClass="order__buyer__address__row__phone"
              required={true}
            />
          </div>
        </div>
        <div className="order__buyer__address__row__gap"></div>
        <TextInputForm
          value={values.zipcode}
          _onChange={_onChange}
          label="Zipcode"
          name="zipcode"
          placeholder=" Zipcode "
          styles={{ title: 'form-label--name' }}
          containerClass={{ width: '100%' }}
          required={true}
        />
      </div>

      <button className="btn" onClick={_makeOrder}>
        order now
      </button>
    </div>
  );
}
