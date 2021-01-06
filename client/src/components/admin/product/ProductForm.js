import React, { useState } from 'react';

export default function CategoryForm({ open }) {
  const _setValue = (e) => {};

  const initialState = {
    title: '',
    description: '',
    price: '$100.00',
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    brands: ['Apple', 'Samsung', 'Silver', 'Microsoft', 'Lenovo', 'ASUS'],
    color: '',
    brand: '',
  };

  const [values, setValue] = useState(initialState);
  const [showForm, setShowForm] = useState(false);

  // const { title } = values;

  const _onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
  };
  const _onSubmit = (e) => {
    e.preventDefault();
  };

  return (
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
          <div className="form-group">
            <label>
              <div className="form-label--name">Title</div>
              <input
                type="text"
                name="title"
                className="form-input  category__input"
                value={values.name}
                onChange={_onChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              <div className="form-label--name">Description</div>
              <textarea
                name="description"
                value={values.description}
                onChange={_onChange}
                className="form-input  category__input--textarea"
                rows={8}
              />
            </label>
          </div>
        </div>
        {/* CENTER BLOCK  */}
        <div className="product__form-c-block">
          <div className="form-group">
            <label>
              <div className="form-label--name">Quantity</div>
              <input
                type="number"
                name="quantity"
                className="form-input  category__input"
                value={values.quantity}
                onChange={_onChange}
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              <div className="form-label--name">Pick your Color</div>
              <select
                name="color"
                value={values.color}
                onChange={_onChange}
                className="form-input  category__input"
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
                className="form-input  category__input"
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
          <div className="form-group">
            <label>
              <div className="form-label--name">Price</div>
              <input
                type="text"
                name="price"
                className="form-input  category__input"
                value={values.price}
                onChange={_onChange}
                required
              />
            </label>
          </div>
          <div className="form-label--name">Shipping</div>
          <div className="form-group form-group__radio">
            <label className=" form-group__radio-label">
              <input
                type="radio"
                value="Yes"
                name="shipping"
                checked={values.shipping === 'Yes'}
                onChange={_onChange}
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
              />

              <span className="form-label--name">No</span>
            </label>
          </div>
        </div>
      </div>
      <input type="submit" value="save" className="btn btn-auth" />
    </form>
  );
}
