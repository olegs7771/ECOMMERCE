// FILTERS LIST OF CATEGORIES

import React, { useState } from 'react';

export default function CategoryFilter() {
  const [name, setName] = useState('');

  return (
    <div className="form-group">
      <label>
        <div className="form-label--name">Search category</div>
        <input
          type="text"
          name="name"
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value.toLocaleLowerCase())}
          required
        />
      </label>
    </div>
  );
}
