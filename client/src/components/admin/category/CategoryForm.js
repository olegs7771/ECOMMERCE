import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategoryAction } from '../../../store/actions/categoryAction';

export default function CategoryForm(props) {
  const [name, setName] = useState('');

  const dispatch = useDispatch();
  const data = { name };

  const _onSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategoryAction(data));
  };

  return (
    <form onSubmit={_onSubmit} className="form">
      <div className="form-group">
        <label>
          <div className="form-label--name">email</div>
          <input
            type="name"
            name="name"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>

      <input type="submit" value="save" className="btn btn-auth" />
    </form>
  );
}
