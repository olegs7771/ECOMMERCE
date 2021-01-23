import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProductAction } from '../../../store/actions/productAction';
import { clearMessageReduxState } from '../../../store/actions/categoryAction';
import TextInputForm from '../../../utils/TextInputForm';
import { Spinner } from '../../../utils/LoadingComponent';
export default function ProductForm({ open, categoryId, subId, close }) {
  const dispatch = useDispatch();

  const loadingFormProduct = useSelector(
    (state) => state.loading.loadingFormProduct
  );
  const errorRedux = useSelector((state) => state.error.errors);
  const message = useSelector((state) => state.message.message);

  const initialState = {
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
    color: '',
    brand: '',
  };

  const [values, setValue] = useState(initialState);

  // SET ERRORS IN STATE
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(errorRedux);
  }, [errorRedux]);

  const _onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
    setErrors({});
  };

  // TEST FIELDS onMouseLeave event
  const _checkField = (e) => {
    console.log('e mouse leave', e.target.value);
  };

  const _onSubmit = (e) => {
    console.log('Object.keys(errors).length', Object.keys(errors).length);
    if (Object.keys(errors).length === 0) {
      e.preventDefault();
      const data = {
        title: values.title,
        description: values.description,
        price: values.price,
        quantity: values.quantity,
        shipping: values.shipping,
        color: values.color,
        brand: values.brand,
        category: categoryId,
        sub: subId,
      };
      console.log('data', data);
      dispatch(createProductAction(data));
    }
  };

  // CLEAR MESSAGE IN REDUX
  const _clearMessageRedux = () => {
    dispatch(clearMessageReduxState());
    setValue(initialState);
    close();
  };

  return (
    <div>
      {loadingFormProduct ? (
        <Spinner loading={loadingFormProduct} />
      ) : message ? (
        <div className="message">
          <div className="mb-md">
            <span className="message--text">{message}</span>
          </div>
          <button className="btn" onClick={_clearMessageRedux}>
            ok
          </button>
        </div>
      ) : (
        <form
          onSubmit={_onSubmit}
          className={
            open
              ? 'form  category__form product__form'
              : 'form  category__form product__form  product__form--close'
          }
        >
          <div className="heading-3">Add Product</div>
          <div className="product__form-container">
            {/* LEFT BLOCK  */}
            <div className="product__form-l-block">
              <TextInputForm
                error={errors.title}
                value={values.title}
                _onChange={_onChange}
                _checkField={_checkField}
                label="Title"
                type="text"
                name="title"
                placeholder="Name of product.."
              />

              <div className="form-group">
                <label>
                  <div className="form-label--name">Description</div>
                  <textarea
                    name="description"
                    value={values.description}
                    onChange={_onChange}
                    className="form-input  category__input--textarea"
                    rows={8}
                    required
                    placeholder="Provide some description of the product.."
                  />
                </label>
                {errors.description ? (
                  <div className="form-input__error">
                    <div className="form-input__error--text">
                      {errors.description}
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            {/* CENTER BLOCK  */}
            <div className="product__form-c-block">
              <TextInputForm
                error={errors.quantity}
                value={values.quantity}
                _onChange={_onChange}
                _checkField={_checkField}
                label="Quantity"
                type="text"
                name="quantity"
                placeholder="use only numbers 0-9"
              />

              <div className="form-group">
                <label>
                  <div className="form-label--name">Pick your Color</div>
                  <select
                    name="color"
                    value={values.color}
                    onChange={_onChange}
                    className="form-input  "
                    required
                  >
                    <option>Select Color</option>
                    {initialState.colors.map((color) => (
                      <option value={color} key={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="form-group">
                <label>
                  <div className="form-label--name">Pick your Brand</div>
                  <select
                    name="brand"
                    value={values.brand}
                    onChange={_onChange}
                    className="form-input  "
                    required
                  >
                    <option>Select Brand</option>
                    {initialState.brands.map((brand) => (
                      <option value={brand} key={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            {/* RIGHT BLOCK  */}
            <div className="product__form-r-block">
              <TextInputForm
                error={errors.price}
                value={values.price}
                _onChange={_onChange}
                _checkField={_checkField}
                label="Price"
                type="text"
                name="price"
                placeholder="eg 100.00"
              />

              <div className="form-label--name">Shipping</div>
              <div className="form-group form-group__radio">
                <label className=" form-group__radio-label">
                  <input
                    type="radio"
                    value="Yes"
                    name="shipping"
                    checked={values.shipping === 'Yes'}
                    onChange={_onChange}
                    required
                  />
                  <span className="form-label--name">Yes</span>
                </label>
                <label className=" form-group__radio-label">
                  <input
                    type="radio"
                    value="No"
                    name="shipping"
                    checked={values.shipping === 'No'}
                    onChange={_onChange}
                    required
                  />

                  <span className="form-label--name">No</span>
                </label>
              </div>
            </div>
          </div>
          <input type="submit" value="save" className="btn " />
        </form>
      )}
    </div>
  );
}
