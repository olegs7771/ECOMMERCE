import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import sprite_material from '../../img/sprite_material.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateProductCartAction,
  removeProductAction,
} from '../../store/actions/productAction';
import { SpinnerPuffLoader } from '../../utils/LoadingComponent';

export default function ShoppingCartItem({ item }) {
  const options = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  // REDUX
  const dispatch = useDispatch();
  const guestId = useSelector((state) => state.cookie.cookie.guestId);
  const messageRedux = useSelector((state) => state.message.message);
  const authRedux = useSelector((state) => state.auth);

  //UPON ARRIVING MESSAGE AFTER UPDATE REVERSE loading to false
  useEffect(() => {
    setLoading(false);
  }, [messageRedux]);

  //STATE
  const [loading, setLoading] = useState(false);

  // UPDATE AMOUNT
  const _onChangeSelect = (e) => {
    console.log('e select', e.target.value);
    let data;
    if (authRedux.isAuthenticated) {
      data = {
        userId: authRedux.user.id,
        productId: item.product._id,
        amountUpdate: e.target.value,
      };
    } else {
      data = {
        guestId,
        productId: item.product._id,
        amountUpdate: e.target.value,
      };
    }

    dispatch(updateProductCartAction(data));
    setLoading(true);
  };

  // REMOVE PRODUCT FROM CART
  const _removeProdct = (e) => {
    let data;
    if (authRedux.isAuthenticated) {
      data = {
        productId: item._id,
        userId: authRedux.user.id,
      };
    } else {
      data = {
        productId: item._id,
        guestId,
      };
    }

    dispatch(removeProductAction(data));
  };

  return (
    <div className="productlist__item__wrapper">
      <div
        className={
          loading
            ? 'productlist__item__overlay--visible'
            : 'productlist__item__overlay'
        }
      >
        <SpinnerPuffLoader />
      </div>

      <div
        className={
          loading
            ? 'productlist__item productlist__item--blured'
            : 'productlist__item'
        }
      >
        <div className="productlist__item__contents">
          {/* IMAGE  */}
          <div className="productlist__item__image-container">
            <Image
              cloudName="dyl4kpmie"
              publicId={item.product.images[0]}
              width="200"
              crop="scale"
              className="productlist__item__image-container--image "
            />
          </div>
          {/* INFORMATION GRID */}
          <div className="productlist__item__information-container">
            <ul className="productlist__item__information-container__list">
              <li className="productlist__item__information-container__list__title">
                <div className="productlist__item__information-container__list__title--title">
                  {item.product.title}
                </div>
              </li>
              <li className="productlist__item__information-container__list__brand">
                <div className="productlist__item__information-container__list__brand--brand">
                  {item.product.brand}
                </div>
              </li>
              <li className="productlist__item__information-container__list__color">
                {item.product.color}
              </li>
            </ul>
            <div className="productlist__item__information-container__controls">
              <div className="productlist__item__information-container__controls__quantity">
                <div className="productlist__item__information-container__controls__quantity__dropdown">
                  {/* DROPDOWN SELECT  */}
                  <select
                    name="quantity"
                    // value={values.color}
                    onChange={_onChangeSelect}
                    className="select"
                    required
                  >
                    <option>{item.quantity}</option>
                    {options.map((num) => (
                      <option value={num} key={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  <svg className="select__icon ">
                    <use href={sprite_material + '#icon-keyboard_arrow_down'} />
                  </svg>
                </div>
              </div>
              <div
                className="productlist__item__information-container__controls__remove"
                onClick={_removeProdct}
              >
                <span className="productlist__item__information-container__controls__remove--remove">
                  Remove product
                </span>
              </div>
            </div>
            <div className="productlist__item__information-container__prices">
              <div className="productlist__item__information-container__prices--price">
                $ {parseFloat(item.product.price * item.quantity).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
