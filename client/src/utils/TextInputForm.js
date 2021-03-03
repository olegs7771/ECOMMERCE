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
  required,
  disabled,
}) {
  return (
    <div className={styles.form_group}>
      <label>
        <div className={styles.title}>
          {label}{' '}
          {required ? (
            <span className="form-group--required-icon">*</span>
          ) : null}
        </div>
        <input
          type={type}
          name={name}
          className={error ? 'form-input form-input--invalid ' : 'form-input'}
          value={value}
          onChange={_onChange}
          onMouseLeave={_checkField}
          placeholder={placeholder}
          disabled={disabled}
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
