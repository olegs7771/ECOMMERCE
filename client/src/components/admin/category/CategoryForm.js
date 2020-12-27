import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CategoryForm() {
  return (
    <form onSubmit={_submitLogin} className="form">
      <div className="form-group">
        <label>
          <div className="form-label--name">email</div>
          <input
            type="email"
            name="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>

      <input type="submit" value="submit" className="btn btn-auth" />
    </form>
  );
}
