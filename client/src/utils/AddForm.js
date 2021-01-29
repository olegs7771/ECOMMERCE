import React from 'react';

export default function CategoryForm({
  name,
  _onSubmit,
  _setName,
  title,
  errors,
}) {
  return (
    <form onSubmit={_onSubmit} className="form  category__form">
      <div className="form-group">
        <label>
          <div className="form-label--name">{title}</div>
          <input
            type="name"
            name="name"
            className="form-input   "
            value={name}
            onChange={_setName}
            required
          />
          {errors.name && (
            <div className="form__error-message">{errors.name}</div>
          )}
        </label>
      </div>

      <input type="submit" value="save" className="btn btn-auth" />
    </form>
  );
}
