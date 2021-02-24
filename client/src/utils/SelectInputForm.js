import React from 'react';
import sprite_material from '../img/sprite_material.svg';

export default function SelectInputForm({
  styles,
  _onChange,
  array,
  value,
  name,
  label,
  select,
}) {
  return (
    <div className="form-group">
      <div className={styles.title}>{label}</div>
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
