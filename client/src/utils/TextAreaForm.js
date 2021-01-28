import React from 'react';

export default function TextAreaForm({
  type,
  name,
  value,
  onChange,
  rows,
  cols,
  errors,
  required,
}) {
  return (
    <textarea
      type={type}
      name={name}
      className={errors ? 'form-input card__input--invalid' : 'form-input'}
      value={value}
      onChange={onChange}
      rows={rows}
      cols={cols}
      required={required}
    />
  );
}
