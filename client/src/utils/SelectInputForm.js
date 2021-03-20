import React from 'react';

export default function SelectInputForm({
  styles,
  _onChange,
  array,
  value,
  name,
  label,
  select,
  required,
  error,
  disabled,
}) {
  return (
    <div className={styles.form_group}>
      <div className={styles.title}>
        {label}
        {required ? <span className="form-group--required-icon">*</span> : null}
      </div>
      <select
        name={name}
        value={value}
        onChange={_onChange}
        className={
          error ? 'form-input form-input--invalid ' : styles.form_input
        }
        required
        disabled={disabled}
      >
        <option>{select}</option>
        {array.map((val) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
      {error ? (
        <div className="form-input__error">
          <div className="form-input__error--text">{error}</div>
        </div>
      ) : null}
    </div>
  );
}
