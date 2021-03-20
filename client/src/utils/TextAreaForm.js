import React from 'react';

export default function TextAreaForm({
  type,
  name,
  value,
  onChange,
  rows,
  cols,
  error,
  required,
}) {
  return (
    <div>
      <textarea
        type={type}
        name={name}
        className={error ? 'form-input card__input--invalid' : 'form-input'}
        value={value}
        onChange={onChange}
        rows={rows}
        cols={cols}
        required={required}
      />
      {error ? (
        <div className="form-input__error">
          <div className="form-input__error--text">{error}</div>
        </div>
      ) : null}
    </div>
  );
}
