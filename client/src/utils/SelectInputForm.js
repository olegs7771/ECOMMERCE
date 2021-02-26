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
}) {
  return (
    <div className="form-group">
      <div className={styles.title}>
        {label}
        {required ? <span className="form-group--required-icon">*</span> : null}
      </div>
      <select
        name={name}
        value={value}
        onChange={_onChange}
        className={styles.form_input}
        required
      >
        <option>{select}</option>
        {array.map((val) => (
          <option value={val} key={val}>
            {val}
          </option>
        ))}
      </select>
    </div>
  );
}
