import React from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  return (
    <div className="background">
      <div className="container">
        <div className="body">
          <div className="login">
            <h2 className="title">Quên mật khẩu</h2>
            <p className="description">
              Chúng tôi sẽ gửi lại mật khẩu tài khoản của bạn vào email
            </p>
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="input-email"
            />
            <button className="submit-btn">Tiếp tục</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
