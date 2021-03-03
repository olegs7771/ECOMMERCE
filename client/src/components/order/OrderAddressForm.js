import React, { useState, useEffect } from 'react';
import TextInputForm from '../../utils/TextInputForm';
import SelectInputForm from '../../utils/SelectInputForm';
import CanadianCitiesFieldForm from '../../utils/CanadianCitiesFieldForm';
import { useDispatch, useSelector } from 'react-redux';
import {
  createOrderGuestAction,
  // clearOrderStateAction,
} from '../../store/actions/orderAction';
import {
  clearErrorReduxState,
  // clearMessageReduxState,
} from '../../store/actions/categoryAction';
import OrderPayment from './OrderPayment';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function OrderAddressForm({ cartId, history, total }) {
  const dispatch = useDispatch();
  // REDUX
  const authRedux = useSelector((state) => state.auth);
  const cookieRedux = useSelector((state) => state.cookie.cookie);
  const errorsRedux = useSelector((state) => state.error.errors);
  // const messageRedux = useSelector((state) => state.message.message);
  const orderRedux = useSelector((state) => state.order.order);

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
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  //disable edit fields after user opened payment form
  const [disable, setDisable] = useState(false);

  const _onChange = (e) => {
    dispatch(clearErrorReduxState());
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const _onChangePhone = (e) => {
    dispatch(clearErrorReduxState());
    setValues({ ...values, phone: e });
  };
  const _onChangeProvince = (e) => {
    dispatch(clearErrorReduxState());
    setShowCity(false);
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const _onChangeCity = (e) => {
    dispatch(clearErrorReduxState());
    console.log('e.target.value city', e.target.value);
    if (e.target.value === 'other') {
      setShowCity(true);
      setValues({ ...values, [e.target.name]: e.target.value });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  //Cretate Order in DB
  const _orderDetails = () => {
    let data;
    const deatailObject = {
      fname: values.first_name,
      lname: values.last_name,
      email: values.email,
      province: values.province_territory_value,
      city: values.city,
      suit: values.suit_apt,
      street: values.street_address,
      phone: values.phone,
      zipcode: values.zipcode,
      cartId,
      total,
    };
    if (authRedux.isAuthenticated) {
      data = {
        ...deatailObject,
        userId: authRedux.user.id,
      };
    } else {
      data = {
        ...deatailObject,
        guestId: cookieRedux.guestId,
      };
    }

    dispatch(createOrderGuestAction(data));
  };

  //If Order was created than open payment form to Proceed

  useEffect(() => {
    if (orderRedux._id) {
      setDisable(true);
      setShowPaymentForm(true);
    }
  }, [orderRedux._id, dispatch]);

  return (
    <div className="order__buyer__address">
      <div className="order__buyer__address__row">
        <TextInputForm
          value={values.first_name}
          _onChange={_onChange}
          label="First Name"
          name="first_name"
          placeholder="John"
          styles={{
            title: 'form-label--name',
            form_group: 'form-group order__buyer__address__form-group',
          }}
          required={true}
          error={errorsRedux.fname}
          disabled={disable}
        />
        <div className="order__buyer__address__row__gap"></div>
        <TextInputForm
          value={values.last_name}
          _onChange={_onChange}
          label="Last Name"
          name="last_name"
          placeholder="Brown"
          styles={{
            title: 'form-label--name',
            form_group: 'form-group order__buyer__address__form-group',
          }}
          required={true}
          error={errorsRedux.lname}
          disabled={disable}
        />
      </div>
      <div className="order__buyer__address__row">
        <TextInputForm
          value={values.business_name}
          _onChange={_onChange}
          label="Business Name"
          name="business_name"
          placeholder="Your business name.. (optional)"
          styles={{
            title: 'form-label--name',
            form_group: 'form-group order__buyer__address__form-group',
          }}
          error={errorsRedux.business_name}
          disabled={disable}
        />
        <div className="order__buyer__address__row__gap"></div>

        <TextInputForm
          value={values.email}
          _onChange={_onChange}
          label="Email"
          name="email"
          placeholder=" example@somemail.com "
          styles={{
            title: 'form-label--name',
            form_group: 'form-group order__buyer__address__form-group',
          }}
          containerClass={{ width: '100%' }}
          required={true}
          error={errorsRedux.email}
          disabled={disable}
        />
      </div>
      <div className="order__buyer__address__row">
        <div className="order__buyer__address__row__wrapper">
          <SelectInputForm
            _onChange={_onChangeProvince}
            array={initialState.province_territory}
            value={values.province_territory_value}
            styles={{
              title: 'form-label--name form-label--name__select',
              form_input: 'form-input-select ',
              form_group: 'form-group order__buyer__address__form-group-select',
            }}
            name="province_territory_value"
            label="Province/Territory"
            select="Select Province/Territory"
            title="Select Province/Territory"
            required={true}
            error={errorsRedux.province}
            disabled={disable}
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
            styles={{
              title: 'form-label--name',
              form_group:
                'form-group order__buyer__address__form-group form-group order__buyer__address__form-group--other',
            }}
            required={true}
            error={errorsRedux.city}
            disabled={disable}
          />
        ) : (
          <div className="order__buyer__address__row__wrapper">
            <CanadianCitiesFieldForm
              _onChange={_onChangeCity}
              province={values.province_territory_value}
              value={values.city}
              styles={{
                title: 'form-label--name form-label--name__select',
                form_input: 'form-input-select',
                form_group:
                  'form-group order__buyer__address__form-group-select',
              }}
              name="city"
              label="City/Town"
              select="Select City/Town"
              title="City/Town"
              required={true}
              error={errorsRedux.city}
              disabled={disable}
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
          styles={{
            title: 'form-label--name',
            form_group: 'form-group order__buyer__address__form-group',
          }}
          required={true}
          error={errorsRedux.suit}
          disabled={disable}
        />
        <div className="order__buyer__address__row__gap"></div>

        <TextInputForm
          value={values.street_address}
          _onChange={_onChange}
          label="Street"
          name="street_address"
          placeholder=" Your street name.."
          styles={{
            title: 'form-label--name',
            form_group: 'form-group order__buyer__address__form-group',
          }}
          required={true}
          error={errorsRedux.street}
          disabled={disable}
        />
      </div>
      <div className="order__buyer__address__row">
        <div className="order__buyer__address__row__wrapper ">
          <div className="order__buyer__address__row__phone--lable">
            Phone
            <span className="order__buyer__address__row__phone--lable-icon">
              *
            </span>
          </div>
          <div className="order__buyer__address__row__wrapper--phone">
            <PhoneInput
              value={values.phone}
              onChange={(phone) => _onChangePhone(phone)}
              onlyCountries={['ca', 'us']}
              enableAreaCodes={['ca', 'usa']}
              country={'ca'}
              inputClass="order__buyer__address__row__phone"
              required={true}
              isValid={!errorsRedux.phone}
            />
            {errorsRedux.phone ? (
              <div className="form-input__error">
                <div className="form-input__error--text order__buyer__address__row__phone--error ">
                  {errorsRedux.phone}
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="order__buyer__address__row__gap"></div>
        <TextInputForm
          value={values.zipcode}
          _onChange={_onChange}
          label="Zipcode"
          name="zipcode"
          placeholder=" Zipcode "
          styles={{
            title: 'form-label--name',
            form_group: 'form-group order__buyer__address__form-group',
          }}
          containerClass={{ width: '100%' }}
          required={true}
          error={errorsRedux.zipcode}
          disabled={disable}
        />
      </div>
      <div
        className={
          showPaymentForm
            ? 'order__payment__wrapper order__payment__wrapper--visible'
            : 'order__payment__wrapper'
        }
      >
        <OrderPayment order={orderRedux} />
        {showPaymentForm ? null : (
          <button className="btn order__btn-wrapper" onClick={_orderDetails}>
            Proceed to Payment
          </button>
        )}
      </div>
    </div>
  );
}
