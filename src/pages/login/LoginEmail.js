import React from "react";
import { Link } from "react-router-dom";

const LoginEmail = () => {
  const handleLogin = () => {
    // Thêm logic đăng nhập ở đây
  };

  return (
    <div className="background">
      <div className="container">
        {/* Phần Đăng nhập */}
        <div className="login-section">
          <h2 style={{ color: "black" }}>Đăng nhập</h2>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="input-field"
          />
          <div className="login-actions">
            <Link to="/forgotpassword" style={{ color: "blue" }}>
              Quên mật khẩu?
            </Link>
          </div>
          <button className="login-button" onClick={handleLogin}>
            Đăng nhập
          </button>
        </div>

        {/* Phần Xin chào */}
        <div className="welcome-section">
          <h2 style={{ color: "black" }}>Xin chào</h2>
          <p>
            Nhập thông tin cá nhân của bạn và cùng chúng tôi khởi đầu hành trình thú vị này!
          </p>
          <Link to="/signup" style={{ color: "blue" }}>
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginEmail;
