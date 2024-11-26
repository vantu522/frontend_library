import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    alert('Signup Success');
    navigate('/loginemail');
  };

  return (
    <div className="signup-container">
      <div className="welcomeagain-section">
        <h2>CHÀO MỪNG TRỞ LẠI</h2>
        <p>Hãy đăng nhập bằng thông tin cá nhân của bạn để không bỏ lỡ bất kỳ điều gì từ chúng tôi!</p>
        <Link to="/loginemail" className="register-button">ĐĂNG NHẬP</Link> 
      </div>
      <div className="signup-form">
        <h2>ĐĂNG KÝ</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text" 
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit" className="login-button">ĐĂNG KÝ</button> 
        </form>
      </div>
    </div>
  );
}

export default Signup;
