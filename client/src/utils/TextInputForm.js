import React from 'react';

export default function TextInputForm({
  error,
  value,
  _onChange,
  _checkField,
  label,
  type,
  name,
  placeholder,
}) {
  return (
    <div className="form-group">
      <label>
        <div className="form-label--name">{label}</div>
        <input
          type={type}
          name={name}
          className={error ? 'form-input form-input--invalid ' : 'form-input'}
          value={value}
          onChange={_onChange}
          onMouseLeave={_checkField}
          placeholder={placeholder}
          required
        />
      </label>
      {error ? (
        <div className="form-input__error">
          <div className="form-input__error--text">{error}</div>
        </div>
      ) : null}
    </div>
  );
}