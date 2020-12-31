import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSubAction } from '../../../store/actions/subAction';

export default function CategoryForm({ categoryId }) {
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const data = { name, categoryId, slug: name };

  const _onSubmit = (e) => {
    e.preventDefault();
    dispatch(createSubAction(data));
  };

  return (
    <form onSubmit={_onSubmit} className="form  category__form">
      <div className="form-group">
        <label>
          <div className="form-label--name">Add Category (name)</div>
          <input
            type="name"
            name="name"
            className="form-input  category__input"
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase())}
            required
          />
        </label>
      </div>

      <input type="submit" value="save" className="btn btn-auth" />
    </form>
  );
}
