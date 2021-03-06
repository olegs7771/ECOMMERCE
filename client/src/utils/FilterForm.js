import React from 'react';

export default function CategoryFilter({ _setFilterSearch, keyword }) {
  return (
    <div className="form-group">
      <label>
        <div className="form-label--name">Filter categories</div>
        <input
          type="text"
          name="name"
          className="form-input "
          placeholder="filter.."
          value={keyword}
          onChange={_setFilterSearch}
          required
          autoComplete="off"
        />
      </label>
    </div>
  );
}
