import React, { useState } from 'react';

export default function CategoryForm({ name, _onSubmit, _setName, title }) {
  return (
    <form onSubmit={_onSubmit} className="form  category__form product__form">
      <div className="heading-3">Add Product</div>
      <div className="form-group">
        <label>
          <input
            type="name"
            name="name"
            className="form-input  category__input"
            value={name}
            onChange={_setName}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          <input
            type="name"
            name="name"
            className="form-input  category__input"
            value={name}
            onChange={_setName}
            required
          />
        </label>
      </div>
      <input type="submit" value="save" className="btn btn-auth" />
    </form>
  );
}
