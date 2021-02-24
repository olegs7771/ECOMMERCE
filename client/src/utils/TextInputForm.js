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
  styles,
}) {
  return (
    <div className="form-group">
      <label>
        <div className={styles.title}>{label}</div>
        <input
          type={type}
          name={name}
          className={error ? 'form-input form-input--invalid ' : 'form-input'}
          value={value}
          onChange={_onChange}
          onMouseLeave={_checkField}
          placeholder={placeholder}
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

TextInputForm.defaultProps = {
  type: 'text',
};
