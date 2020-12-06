import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="register">
      <div className="register__container">
        <h2 className="register__heading">Login</h2>
        <form className="register__form">
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
                name="password"
                className="register__form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <input type="submit" value="submit" className="btn btn-auth" />
        </form>
      </div>
    </div>
  );
};

export default Login;
