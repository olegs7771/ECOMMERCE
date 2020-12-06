import React, { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  return (
    <div className="register">
      <div className="register__container">
        <h2 className="register__heading">Register</h2>
        <form className="register__form">
          <div className="register__form-group">
            <label>
              <div className="register__form-label--name">name</div>
              <input
                type="text"
                name="name"
                className="register__form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div className="register__form-group">
            <label>
              <div className="register__form-label--name">email</div>
              <input
                type="text"
                name="email"
                className="register__form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="register__form-group">
            <label>
              <div className="register__form-label--name">password</div>
              <input
                type="text"
                name="password1"
                className="register__form-input"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
            </label>
          </div>
          <div className="register__form-group">
            <label>
              <div className="register__form-label--name">confirm</div>
              <input
                type="text"
                name="password2"
                className="register__form-input"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </label>
          </div>
          <input type="submit" value="submit" className="btn" />
        </form>
      </div>
    </div>
  );
};

export default Register;
