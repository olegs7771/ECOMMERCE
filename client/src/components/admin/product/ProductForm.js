import React, { useState } from 'react';

export default function CategoryForm() {
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

  // const { title } = values;

  const _onChange = (e) => {
    setValue({ ...values, [e.target.name]: e.target.value });
    console.log(e.target.name + '-----------' + e.target.value);
  };
  const _onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={_onSubmit} className="form  category__form product__form">
      <div className="heading-3">Add Product</div>
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
            className="form-input  category__input"
          />
        </label>
      </div>
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
          <div className="form-label--name">Shipping</div>
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
      <input type="submit" value="save" className="btn btn-auth" />
    </form>
  );
}