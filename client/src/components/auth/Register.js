import React from 'react';

const Register = () => {
  return (
    <div className="register">
      <div className="register__container">
        <div className="register__heading">
          <form className="register__form">
            <label className="register__form-label">
              <div className="register__form-label--name">name</div>
              <input type="text" name="name" />
            </label>
            <label className="register__form-label">
              <div className="register__form-label--name">email</div>
              <input type="text" name="email" />
            </label>
            <label className="register__form-label">
              <div className="register__form-label--name">password</div>
              <input type="text" name="password" />
            </label>
            <label className="register__form-label">
              <div className="register__form-label--name">confirm</div>
              <input type="text" name="password" />
            </label>
            <input type="submit" value="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
