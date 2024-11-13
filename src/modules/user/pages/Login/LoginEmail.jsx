import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginEmail.css';

function LoginEmail() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    alert('Success');
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>ĐĂNG NHẬP</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="forgot-password">
            <Link to="/forgotpassword">Quên mật khẩu?</Link>
          </div>
          <button type="submit" className="login-button">ĐĂNG NHẬP</button>
        </form>
      </div>
      <div className="welcome-section">
        <h2>XIN CHÀO</h2>
        <p>Nhập thông tin cá nhân của bạn và cùng chúng tôi khởi đầu hành trình thú vị này!</p>
        <Link to="/signup" className="register-button">ĐĂNG KÝ</Link>
      </div>
    </div>
  );
}

export default LoginEmail;
